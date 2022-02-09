import { ValidationException } from '../exceptions/ValidationException.excpetions.js';

export function isValidTypesB2B(sourceType: string, destinationType: string): void {
  let error: string = '';
  if (sourceType !== 'business') error = error.concat('Source must be of type business!');
  if (destinationType !== 'business')
    error = error.concat('Destination must be of type business!');
  if (error.length > 0) throw new ValidationException(error);
}
export function isSameCurrency(sourceCurrency: string, destinationCurrency: string): void {
  if (!(sourceCurrency === destinationCurrency))
    throw new ValidationException('Currency must be the same!');
}
export function isDifferentCurrency(sourceCurrency: string, destinationCurrency: string): void {
  if (sourceCurrency === destinationCurrency)
    throw new ValidationException('Currency must be the different!');
}
export function isValidBalanceB2B(sourceBalance: number, amount: number): void {
  if (sourceBalance - amount < 10000)
    throw new ValidationException('Source account must remain with at least 10000');
}
export function isValidBalanceB2I(sourceBalance: number, amount: number): void {
  if (sourceBalance - amount < 1000)
    throw new ValidationException('Source account must remain with at least 10000');
}
export function isValidTypesB2I(sourceType: string, destinationType: string): void {
  let error: string = '';
  if (sourceType !== 'business') error = error.concat('Source has to be business!\n');
  if (destinationType !== 'individual') error = error.concat('Destination has to be individual!');
  if (error.length > 0) throw new ValidationException(error);
}

export function isActiveAccounts(sourceStatus: number, destinationStatus: number): void {
  let error: string = '';
  if (sourceStatus !== 1) error = error.concat('Source status must be active!');
  if (destinationStatus !== 1) error = error.concat('Destination status must be active!');
  if (error.length > 0) throw new ValidationException(error);
}

export function isLimitValidB2B(
  sourceCompanyId: number,
  destinationCompanyId: number,
  amount: number,
): void {
  let error: string = '';
  if (sourceCompanyId === destinationCompanyId && amount > 10000)
    error = error.concat('Amount must be under or equal to 10000 for same company!');
  if (sourceCompanyId !== destinationCompanyId && amount > 1000)
    error = error.concat('Amount must be under or equal to 1000 for different companies!');
  if (error.length > 0) throw new ValidationException(error);
}

export function isLimitValidB2I(amount: number): void {
  if (amount > 1000) throw new ValidationException('Amount must be under or equal to 1000');
}
