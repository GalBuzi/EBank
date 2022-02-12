import { getBusinessAccountById } from '../../repositories/SQLRepository/business.repository.js';
import { getIndividualAccountById } from '../../repositories/SQLRepository/individual.repository.js';
import { RowDataAccount, RowDataBusiness, RowDataIndividual } from '../../types/rowData.types.js';
import * as VALIDATOR from './validator.logic.utils.js';
import { validationConfigObj } from '../initializer.utils.js';
import { transferValidationStringToFuncPointer } from './validator.logic.utils.js';
import { ValidationException } from '../../exceptions/ValidationException.excpetions.js';
import { TransferValidationPerRoute } from './types.validations.js';
import builderSQL from '../builder.utils.js';
import { IBusinessAccountDTO, IFamilyAccountDTO, IIndividualAccountDTO } from '../../types/dto.types.js';
import { IFamilyAccountModel } from '../../types/models.types.js';

function runValidationFunctions(validationTranserName:string, source : RowDataAccount, 
  destination: RowDataAccount, amount:number):void{
  let validAnswers : string[] = [];

  //validate mutual functions
  const mutual = validationConfigObj.transfers_mutual_validation;
  mutual.forEach(funcName=>{
    const func = transferValidationStringToFuncPointer[funcName];
    const answers = func(source, destination, amount);      
    validAnswers = validAnswers.concat(answers);
  });
  //validate per transfer type
  const validationTransfer = validationConfigObj.transfers_individual_validation.find(r => r.transfer_type === validationTranserName);
  if (validationTransfer) {
    const validFunctionsObj = validationTransfer.validation_functions;
    validFunctionsObj.forEach(obj => {
      const func = transferValidationStringToFuncPointer[obj];
      const answers = func(source, destination, amount);      
      validAnswers = validAnswers.concat(answers);
    });
  }  
  const toNext = validAnswers.filter(ans => ans !== 'true');
  if (toNext.length > 0) throw new ValidationException(toNext.join(', '));
  else return;
}

export async function validateTransferB2B(sourceId: number, destinationId: number, 
  amount: number): Promise<{ source: IBusinessAccountDTO; destination: IBusinessAccountDTO }> {
  const source = await builderSQL.getBusinessAccountById(sourceId);
  const destination = await builderSQL.getBusinessAccountById(destinationId);
  runValidationFunctions(TransferValidationPerRoute.validateTransferB2B, source, destination, amount);
  return { source, destination };
}

export async function validateTransferB2BFX(
  sourceId: number,
  destinationId: number,
  amount: number,
): Promise<{ source: IBusinessAccountDTO; destination: IBusinessAccountDTO }> {
  const source = await builderSQL.getBusinessAccountById(sourceId);
  const destination = await builderSQL.getBusinessAccountById(destinationId);
  runValidationFunctions(TransferValidationPerRoute.validateTransferB2BFX, source, destination, amount);
  return { source, destination };
}

export async function validateTransferB2I(
  sourceId: number,
  destinationId: number,
  amount: number,
): Promise<{ source: IBusinessAccountDTO; destination: IIndividualAccountDTO }> {
  const source = await builderSQL.getBusinessAccountById(sourceId);
  const destination = await builderSQL.getIndividualAccountById(destinationId);
  runValidationFunctions(TransferValidationPerRoute.validateTransferB2I, source, destination, amount);
  return { source, destination };
}

export async function validateTransferF2B(
  sourceId: number,
  destinationId: number,
  amount: number,
): Promise<{ source: IFamilyAccountDTO; destination: IBusinessAccountDTO }> {
  const source = await builderSQL.getFamilyAccountById(sourceId, 'full');
  const destination = await builderSQL.getBusinessAccountById(destinationId);
  runValidationFunctions(TransferValidationPerRoute.validateTransferF2B, source, destination, amount);
  return { source, destination };
}

export async function validateFamilyAccountCreationOwners(familyModel : IFamilyAccountModel):Promise<IFamilyAccountModel>{
  const sorted : number[][] = familyModel.owners.sort((a, b) => a[0] - b[0] ); //rows return in ascending order from sql
  const ids = sorted.map(o => o[0]);
  const contributions = sorted.map(o => o[1]);
  const individuals = await builderSQL.getListOfIndividualsAccountsById(ids);
  
  console.log(ids);

  const tuples : number[][] = [];
  individuals.reduce( (acc, curr, i) => {  
    if (curr.individual_account_id !== null &&   //all exist
      curr.status_id === 1 &&                    //all active
      curr.type_name === 'individual' &&        //all type individual
      curr.currency === familyModel.currency && //same currency as defined
      curr.balance - contributions[i] > 0){     //all can contribute      
      tuples.push([ids[i], contributions[i]]);
    }
    return acc;
  }, tuples);

  const sum : number = tuples.reduce( (acc, curr) =>  acc += curr[1], 0);
  console.log(sum);
  
  if (sum >= 5000) {
    familyModel.owners = tuples;
  } else {
    familyModel.owners = [];
  }
  return familyModel;
}
