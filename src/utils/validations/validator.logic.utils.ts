import { ValidationException } from '../../exceptions/ValidationException.excpetions.js';
import { RowDataAccount, RowDataBusiness } from '../../types/builder.types.js';
import { IValidationStringToFuncPointer } from './types.validations.js';

// export function isValidTypesB2B(sourceType: string, destinationType: string): void {
//   let error: string = '';
//   if (sourceType !== 'business') error = error.concat('Source must be of type business!');
//   if (destinationType !== 'business')
//     error = error.concat('Destination must be of type business!');
//   if (error.length > 0) throw new ValidationException(error);
// }
// export function isSameCurrency(sourceCurrency: string, destinationCurrency: string): void {
//   if (!(sourceCurrency === destinationCurrency))
//     throw new ValidationException('Currency must be the same!');
// }
// export function isDifferentCurrency(sourceCurrency: string, destinationCurrency: string): void {
//   if (sourceCurrency === destinationCurrency)
//     throw new ValidationException('Currency must be the different!');
// }
// export function isValidBalanceB2B(sourceBalance: number, amount: number): void {
//   if (sourceBalance - amount < 10000)
//     throw new ValidationException('Source account must remain with at least 10000');
// }
// export function isValidBalanceB2I(sourceBalance: number, amount: number): void {
//   if (sourceBalance - amount < 1000)
//     throw new ValidationException('Source account must remain with at least 10000');
// }
// export function isValidTypesB2I(sourceType: string, destinationType: string): void {
//   let error: string = '';
//   if (sourceType !== 'business') error = error.concat('Source has to be business!\n');
//   if (destinationType !== 'individual') error = error.concat('Destination has to be individual!');
//   if (error.length > 0) throw new ValidationException(error);
// }

// export function isActiveAccounts(sourceStatus: number, destinationStatus: number): void {
//   let error: string = '';
//   if (sourceStatus !== 1) error = error.concat('Source status must be active!');
//   if (destinationStatus !== 1) error = error.concat('Destination status must be active!');
//   if (error.length > 0) throw new ValidationException(error);
// }

// export function isLimitValidB2B(
//   sourceCompanyId: number,
//   destinationCompanyId: number,
//   amount: number,
// ): void {
//   let error: string = '';
//   if (sourceCompanyId === destinationCompanyId && amount > 10000)
//     error = error.concat('Amount must be under or equal to 10000 for same company!');
//   if (sourceCompanyId !== destinationCompanyId && amount > 1000)
//     error = error.concat('Amount must be under or equal to 1000 for different companies!');
//   if (error.length > 0) throw new ValidationException(error);
// }

// export function isLimitValidB2I(amount: number): void {
//   if (amount > 1000) throw new ValidationException('Amount must be under or equal to 1000');
// }


// =================================== 
// =================================== 
// =================================== 
// =================================== 
// =================================== 
// =================================== 
// =================================== 
// =================================== 
// =================================== 
// =================================== 


export function isValidTypesB2B(source: RowDataAccount, destination: RowDataAccount): string[] {
  const errors : string[] = [];
  if (source.type_name !== 'business') errors.push('source type must be business');
  if (destination.type_name !== 'business') errors.push('destination type must be business');
  return errors;
}

export function isSameCurrency(source: RowDataAccount, destination: RowDataAccount): string[] {
  const errors : string[] = [];
  if (!(source.currency === destination.currency))
    errors.push('currency must be the same');
  return errors;
}

export function isDifferentCurrency(source: RowDataAccount, destination: RowDataAccount): string[] {
  const errors : string[] = [];  
  if (source.currency === destination.currency)
    errors.push('currency must be different');
  return errors;
}

export function isValidBalanceB2B(source: RowDataAccount, 
  destination: RowDataAccount, amount: number): string[] {
  
  const errors : string[] = [];
  if (source.balance - amount < 10000)
    errors.push(`${source.type_name} source account must remain with at least 10000 after transfer to ${destination.type_name} account`);
  return errors;
}
export function isValidBalanceB2I(source: RowDataAccount, 
  destination: RowDataAccount, amount: number): string[] {
  
  const errors : string[] = [];
  if (source.balance - amount < 1000)
    errors.push(`${source.type_name} source account must remain with at least 1000 after transfer to ${destination.type_name} account`);
  return errors;
}
export function isValidTypesB2I(source: RowDataAccount, 
  destination: RowDataAccount): string[] {
  const errors : string[] = [];
  if (source.type_name !== 'business') errors.push('source type has to be business!');
  if (destination.type_name !== 'individual') errors.push('destination type has to be individual!');
  return errors;
}

export function isActiveAccounts(source: RowDataAccount, 
  destination: RowDataAccount): string[] {
  const errors : string[] = [];
  if (source.status_id !== 1) errors.push('source status must be active!');
  if (destination.status_id !== 1) errors.push('destination status must be active!');
  return errors;
}

export function isLimitValidB2B(source: RowDataBusiness, 
  destination: RowDataBusiness, amount: number): string[] {
  const errors : string[] = [];
  
  if (source.company_id === destination.company_id && amount > 10000)
    errors.push('Amount must be under or equal to 10000 for same company!');
  if (source.company_id !== destination.company_id && amount > 1000)
    errors.push('Amount must be under or equal to 1000 for different companies!');

  return errors;
}

export function isLimitValidB2I(source: RowDataAccount, 
  destination: RowDataAccount, amount: number): string[] {
  const errors : string[] = [];
  if (amount > 1000) errors.push(`Amount must be under or equal to 1000 while transfring from ${source.type_name}  account to ${destination.type_name} account`);
  return errors;
}

export const transferValidationStringToFuncPointer : IValidationStringToFuncPointer = {
  'isValidTypesB2B': isValidTypesB2B,
  'isSameCurrency':isSameCurrency,
  'isDifferentCurrency' : isDifferentCurrency,
  'isValidBalanceB2B' : isValidBalanceB2B,
  'isValidBalanceB2I' : isValidBalanceB2I,
  'isValidTypesB2I' : isValidTypesB2I,
  'isActiveAccounts': isActiveAccounts,
  'isLimitValidB2B' : isLimitValidB2B,
  'isLimitValidB2I': isLimitValidB2I,
};