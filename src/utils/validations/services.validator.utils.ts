import { validationConfigObj } from '../initializer.utils.js';
import {
  isAllStatusGivenAccounts,
  isAllGivenType,
  ValidationStringToFuncPointer,
} from './business.logic.validations.js';
import { ValidationException } from '../../exceptions/ValidationException.excpetions.js';
import { LogicValidationPerRoute } from './types.validations.js';
import builderSQL from '../builder.utils.js';
import {
  IAccountDTO,
  IBusinessAccountDTO,
  IFamilyAccountDTO,
  IFamilyAccountDTOShort,
  IIndividualAccountDTO,
} from '../../types/dto.types.js';
import {
  IChangeStatus,
  IChangeStatusAccounts,
  IFamilyAccountModel,
  IModifyFamilyAccount,
} from '../../types/models.types.js';

function runTransferValidationFunctions(
  validationTranserName: string,
  source: IAccountDTO,
  destination: IAccountDTO,
  amount: number,
): void {
  let validAnswers: string[] = [];

  //validate mutual functions
  const mutual = validationConfigObj.transfers_mutual_validation;
  mutual.forEach(funcName => {
    const func = ValidationStringToFuncPointer[funcName];
    const answers = func(source, destination, amount);
    validAnswers = validAnswers.concat(answers);
  });
  //validate per transfer type
  const validationTransfer = validationConfigObj.transfers_individual_validation.find(
    r => r.transfer_type === validationTranserName,
  );
  if (validationTransfer) {
    const validFunctionsObj = validationTransfer.validation_functions;
    validFunctionsObj.forEach(obj => {
      const func = ValidationStringToFuncPointer[obj];
      const answers = func(source, destination, amount);
      validAnswers = validAnswers.concat(answers);
    });
  }
  const toNext = validAnswers.filter(ans => ans !== 'true');
  if (toNext.length > 0) throw new ValidationException(toNext.join(', '));
  else return;
}

export async function validateTransferB2B(
  sourceId: number,
  destinationId: number,
  amount: number,
): Promise<{ source: IBusinessAccountDTO; destination: IBusinessAccountDTO }> {
  const source = await builderSQL.getBusinessAccountById(sourceId);
  const destination = await builderSQL.getBusinessAccountById(destinationId);
  runTransferValidationFunctions(
    LogicValidationPerRoute.validateTransferB2B,
    source,
    destination,
    amount,
  );
  return { source, destination };
}

export async function validateTransferB2BFX(
  sourceId: number,
  destinationId: number,
  amount: number,
): Promise<{ source: IBusinessAccountDTO; destination: IBusinessAccountDTO }> {
  const source = await builderSQL.getBusinessAccountById(sourceId);
  const destination = await builderSQL.getBusinessAccountById(destinationId);
  runTransferValidationFunctions(
    LogicValidationPerRoute.validateTransferB2BFX,
    source,
    destination,
    amount,
  );
  return { source, destination };
}

export async function validateTransferB2I(
  sourceId: number,
  destinationId: number,
  amount: number,
): Promise<{ source: IBusinessAccountDTO; destination: IIndividualAccountDTO }> {
  const source = await builderSQL.getBusinessAccountById(sourceId);
  const destination = await builderSQL.getIndividualAccountById(destinationId);
  runTransferValidationFunctions(
    LogicValidationPerRoute.validateTransferB2I,
    source,
    destination,
    amount,
  );
  return { source, destination };
}

export async function validateTransferF2B(
  sourceId: number,
  destinationId: number,
  amount: number,
): Promise<{ source: IFamilyAccountDTO; destination: IBusinessAccountDTO }> {
  const source = await builderSQL.getFamilyAccountById(sourceId, 'full');
  const destination = await builderSQL.getBusinessAccountById(destinationId);
  runTransferValidationFunctions(
    LogicValidationPerRoute.validateTransferF2B,
    source,
    destination,
    amount,
  );
  return { source, destination };
}

export async function validateFamilyAccountCreationOwners(
  familyModel: IFamilyAccountModel,
): Promise<IFamilyAccountModel> {
  const sorted: number[][] = familyModel.owners.sort((a, b) => a[0] - b[0]); //rows return in ascending order from sql
  const ids = sorted.map(o => o[0]);
  const contributions = sorted.map(o => o[1]);
  const individuals = await builderSQL.getListOfIndividualsAccountsById(ids);

  const tuples: number[][] = [];
  individuals.reduce((acc, curr, i) => {
    if (
      curr.individual_account_id !== null && //all exist
      curr.status_id === 1 && //all active
      curr.type_name === 'individual' && //all type individual
      curr.currency === familyModel.currency && //same currency as defined
      curr.balance - contributions[i] > 0
    ) {
      //all can contribute
      tuples.push([ids[i], contributions[i]]);
    }
    return acc;
  }, tuples);

  const sum: number = tuples.reduce((acc, curr) => (acc += curr[1]), 0);

  if (sum >= 5000) {
    familyModel.owners = tuples;
  } else {
    familyModel.owners = [];
  }
  return familyModel;
}

export async function validateActivateDeactivateAccounts(
  input: IChangeStatus,
): Promise<IChangeStatusAccounts> {
  const inputIndv = input.ids.filter(account => account[1] === 'individual');
  const inputBusiness = input.ids.filter(account => account[1] === 'business');
  const indivIDS = inputIndv.map(tuple => tuple[0]);
  const busiIDS = inputBusiness.map(tuple => tuple[0]);
  const indivDTOS = await builderSQL.getListOfIndividualsAccountsById(indivIDS);
  const businessDTOS = await builderSQL.getListOfBusinessesAccountsById(busiIDS);
  const errors: string[] = [];
  //check all can perform action
  errors.push(...isAllStatusGivenAccounts([...indivDTOS, ...businessDTOS], input.action));
  if (errors.length > 0)
    throw new ValidationException(
      `one of the accounts isnt in correct status to perform ${input.action}`,
    );
  //check no accounts of type family
  errors.push(...isAllGivenType([...indivDTOS, ...businessDTOS], 'family'));
  if (errors.length > 0)
    throw new ValidationException('one of the accounts is type of family where it shouldnt be');

  const retObj = {
    individuals: indivDTOS,
    businesses: businessDTOS,
    action: input.action,
  } as IChangeStatusAccounts;

  return retObj;
}

export async function validateAdditionIndividualsToFamily(
  family_accout_id: number,
  model: IModifyFamilyAccount,
): Promise<IModifyFamilyAccount> {
  //logic validations
  /**
     * The added individual accounts should have the same currency 
        as the family account.
        All accounts in the added list are of type individual
        Only active accounts will be assigned to a family account
     */
  const sorted: number[][] = model.individuals.sort((a, b) => a[0] - b[0]); //rows return in ascending order from sql
  const ids = sorted.map(o => o[0]);
  const contributions = sorted.map(o => o[1]);
  const individuals = await builderSQL.getListOfIndividualsAccountsById(ids);
  const family = await builderSQL.getFamilyAccountById(family_accout_id, 'full');

  const tuples: number[][] = [];
  individuals.reduce((acc, curr, i) => {
    if (
      curr.individual_account_id !== null && //all exist
      curr.status_id === 1 && //all active
      curr.type_name === 'individual' && //all type individual
      curr.currency === family.currency
    ) {
      //same currency as family
      tuples.push([ids[i], contributions[i]]);
    }
    return acc;
  }, tuples);

  model.individuals = tuples;
  return model;
}

export async function validateRemovalIndividualsFromFamily(
  family_accout_id: number,
  model: IModifyFamilyAccount,
): Promise<void> {
  /**
   * If one of the individual accounts does not belong to the family account, an error will be thrown.
   * Every provided individual account must be assigned to the provided family account
    The family account balance will shrink by the summary of its removed owners amounts where each owner can withdraw a different amount.
    In case of removing all of the family owners, the total amounts of the removed owner can result in up to a zero amount, but not go below 0.
    Other than that, in case other owners remain in the family account, we need to ensure a minimum allowed balance is being kept after the removal.
    */
  const sorted: number[][] = model.individuals.sort((a, b) => a[0] - b[0]); //rows return in ascending order from sql
  const ids = sorted.map(o => o[0]);
  const contributions = sorted.map(o => o[1]);
  const individuals = await builderSQL.getListOfIndividualsAccountsById(ids);
  const family = await builderSQL.getFamilyAccountById(family_accout_id, 'short') as IFamilyAccountDTOShort;
  //check individuals belong to family
  for (const indiv of individuals) {
    if (family.owners.every(o => o !== indiv.individual_account_id)){
      throw new ValidationException(`found individual account ${indiv.individual_account_id} which is not belong to family account`);
    }
  }
  //subtract amounts from family account
  const shrinkSum = contributions.reduce( (acc, curr)=> acc += curr);
  if (ids.length === family.owners.length){ //all of the owners are removed
    if (family.balance - shrinkSum < 0){
      throw new ValidationException('the balance that will be left in account is negative');
    }
  } else { //some owners left in account
    if (family.balance - shrinkSum < 5000){
      throw new ValidationException('the balance that will be left in account is lower than the minimal allowed');
    }
  }
}

export async function validateCloseFamilyAccount(family_accout_id: number): Promise<void> {
  /**
   * The family account should have no assigned individual accounts
   * Change family account status to inactive
  */
  const family = await builderSQL.getFamilyAccountById(family_accout_id, 'short') as IFamilyAccountDTOShort;
  if (family.owners.length > 0){
    throw new ValidationException('cant close family account because there are more owners related to it');
  }

}
