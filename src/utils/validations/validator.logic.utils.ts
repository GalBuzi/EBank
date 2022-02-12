import { ValidationException } from '../../exceptions/ValidationException.excpetions.js';
import { RowDataAccount, RowDataBusiness } from '../../types/rowData.types.js';
import { IValidationStringToFuncPointer } from './types.validations.js';

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