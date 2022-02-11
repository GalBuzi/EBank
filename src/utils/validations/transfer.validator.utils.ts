import { getBusinessAccountById } from '../../repositories/SQLRepository/business.repository.js';
import { getIndividualAccountById } from '../../repositories/SQLRepository/individual.repository.js';
import { RowDataAccount, RowDataBusiness, RowDataIndividual } from '../../types/rowData.types.js';
import * as VALIDATOR from './validator.logic.utils.js';
import { validationConfigObj } from '../initializer.utils.js';
import { transferValidationStringToFuncPointer } from './validator.logic.utils.js';
import { ValidationException } from '../../exceptions/ValidationException.excpetions.js';
import { TransferValidationPerRoute } from './types.validations.js';
import builderSQL from '../builder.utils.js';
import { IBusinessAccountDTO, IIndividualAccountDTO } from '../../types/dto.types.js';

// export async function validateTransferB2B(
//   sourceId: number,
//   destinationId: number,
//   amount: number,
//   flag?: string,
// ): Promise<{ source: RowDataBusiness; destination: RowDataBusiness }> {
//   const source = await getBusinessAccountById(sourceId);
//   const destination = await getBusinessAccountById(destinationId);
//   VALIDATOR.isActiveAccounts(source.status_id, destination.status_id);
//   VALIDATOR.isValidTypesB2B(source.type_name, destination.type_name);
//   if (flag === 'fx') {
//     VALIDATOR.isDifferentCurrency(source.currency, destination.currency);
//   } else {
//     VALIDATOR.isSameCurrency(source.currency, destination.currency);
//   }

//   VALIDATOR.isValidBalanceB2B(source.balance, amount);
//   VALIDATOR.isLimitValidB2B(source.company_id, destination.company_id, amount);
//   return { source, destination };
// }

// export async function validateTransferB2I(
//   sourceId: number,
//   destinationId: number,
//   amount: number,
// ): Promise<{ source: RowDataBusiness; destination: RowDataIndividual }> {
//   const source = await getBusinessAccountById(sourceId);
//   const destination = await getIndividualAccountById(destinationId);
//   VALIDATOR.isActiveAccounts(source.status_id, destination.status_id);
//   VALIDATOR.isValidTypesB2I(source.type_name, destination.type_name);
//   VALIDATOR.isSameCurrency(source.currency, destination.currency);
//   VALIDATOR.isValidBalanceB2I(source.balance, destination.balance);
//   VALIDATOR.isLimitValidB2I(amount);
//   return { source, destination };
// }

function runValidationFunctions(validationTranserName:string, source : RowDataAccount, 
  destination: RowDataAccount, amount:number):void{
  const validationTransfer = validationConfigObj.transfers.find(r => r.transfer_type === validationTranserName);
  console.log(validationTransfer);
  let validAnswers : string[] = [];
  if (validationTransfer) {
    const validFunctionsObj = validationTransfer.validation_functions;
    validFunctionsObj.forEach(obj => {
      const func = transferValidationStringToFuncPointer[obj];
      const answers = func(source, destination, amount);      
      validAnswers = validAnswers.concat(answers);
    });
  }
  console.log(validAnswers);
  
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
