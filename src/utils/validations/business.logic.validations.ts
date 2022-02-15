import { IAccountDTO, IBusinessAccountDTO, IFamilyAccountDTOLong } from '../../types/dto.types.js';
import { IValidationStringToFuncPointer } from './types.validations.js';
import { actionToStatusId } from '../../utils/helpers.utils.js';


//types
export function isValidTypesB2B(source: IAccountDTO, destination: IAccountDTO): string[] {
  const errors : string[] = [];
  if (source.type_name !== 'business') errors.push('source type must be business');
  if (destination.type_name !== 'business') errors.push('destination type must be business');

  if (errors.length > 0) return errors;
  return ['true'];
}

export function isValidTypesB2I(source: IAccountDTO, 
  destination: IAccountDTO): string[] {
  const errors : string[] = [];
  if (source.type_name !== 'business') errors.push('source type has to be business');
  if (destination.type_name !== 'individual') errors.push('destination type has to be individual');
  if (errors.length > 0) return errors;
  return ['true'];
}

export function isValidTypesF2B(source: IAccountDTO, destination: IAccountDTO): string[] {
  const errors : string[] = [];
  if (source.type_name !== 'family') errors.push('source type must be family');
  if (destination.type_name !== 'business') errors.push('destination type must be business');
  (source as IFamilyAccountDTOLong).owners.forEach(o=>{
    if (o.type_name !== 'individual'){
      errors.push('found owner which is not individual');
    }
  });
  if (errors.length > 0) return errors;
  return ['true'];
}

export function isAllGivenType(accounts: IAccountDTO[], type:string): string[] {
  const errors : string[] = [];
  for (const acc of accounts) {   
    if (acc.type_name !== type){
      errors.push(`account type must be ${type}`);
    }
  }
  if (errors.length > 0) return errors;
  return ['true'];
}

export function isAllNotGivenType(accounts: IAccountDTO[], type:string): string[] {
  const errors : string[] = [];
  for (const acc of accounts) {   
    if (acc.type_name === type){
      errors.push(`account type must be ${type}`);
    }
  }
  if (errors.length > 0) return errors;
  return ['true'];
}

//currency
export function isSameCurrency(source: IAccountDTO, destination: IAccountDTO): string[] {
  const errors : string[] = [];
  if (!(source.currency === destination.currency))
    errors.push('currency must be the same');
  if (errors.length > 0) return errors;
  return ['true'];
}

export function isDifferentCurrency(source: IAccountDTO, destination: IAccountDTO): string[] {
  const errors : string[] = [];  
  if (source.currency === destination.currency)
    errors.push('currency must be different');
  if (errors.length > 0) return errors;
  return ['true'];
}

export function isSameCurrencyF2B(source: IAccountDTO, destination: IAccountDTO): string[] {
  const errors : string[] = [];
  if (!(source.currency === destination.currency))
    errors.push('currency must be the same');
  (source as IFamilyAccountDTOLong).owners.forEach(o=>{
    if (o.currency !== source.currency){
      errors.push('found owner with different currency');
    }
  });
  if (errors.length > 0) return errors;
  return ['true'];
}

//balance

export function isValidBalanceB2B(source: IAccountDTO, 
  destination: IAccountDTO, amount: number): string[] {

  const errors : string[] = [];
  if (source.balance - amount < 10000)
    errors.push(`${source.type_name} source account must remain with at least 10000 after transfer to ${destination.type_name} account`);
  if (errors.length > 0) return errors;
  return ['true'];  
}

export function isValidBalanceB2I(source: IAccountDTO, 
  destination: IAccountDTO, amount: number): string[] {
  
  const errors : string[] = [];
  if (source.balance - amount < 10000)
    errors.push(`${source.type_name} source account must remain with at least 10000 after transfer to ${destination.type_name} account`);
  if (errors.length > 0) return errors;
  return ['true'];
}

export function isValidBalanceF2B(source: IAccountDTO, 
  destination: IAccountDTO, amount: number): string[] {
  
  const errors : string[] = [];
  if (source.balance - amount < 5000)
    errors.push(`${source.type_name} source account must remain with at least 5000 after transfer to ${destination.type_name} account`);
  if (errors.length > 0) return errors;
  return ['true'];
}

// active 

export function isActiveAccounts(source: IAccountDTO, 
  destination: IAccountDTO): string[] {
  const errors : string[] = [];
  if (source.status_id !== 1) errors.push('source status must be active');
  if (destination.status_id !== 1) errors.push('destination status must be active');
  if (errors.length > 0) return errors;
  return ['true'];
}

export function isActiveAccountsF2B(source: IAccountDTO, 
  destination: IAccountDTO): string[] {
  const errors : string[] = [];
  if (source.status_id !== 1) errors.push('source status must be active');
  if (destination.status_id !== 1) errors.push('destination status must be active');
  (source as IFamilyAccountDTOLong).owners.forEach((o)=> {
    if (o.status_id !== 1){
      errors.push(`owner ${o.first_name} ${o.last_name} has account with inactive status`);
    }
  });
  if (errors.length > 0) return errors;
  return ['true'];
}

export function isAllStatusGivenAccounts(accounts: IAccountDTO[], action:string): string[] {
  const errors : string[] = [];
  const statusToChange = actionToStatusId[action];
  console.log('statusToChange', statusToChange);
  
  for (const acc of accounts) {
    if (acc.status_id === statusToChange){      
      errors.push(`can not perform ${action} on ${acc.status_name} account`);
    }
  }
  if (errors.length > 0) return errors;
  return ['true'];
}

//valid limit

export function isLimitValidB2B(source: IAccountDTO, 
  destination: IAccountDTO, amount: number): string[] {
  const errors : string[] = [];
  
  if ((source as IBusinessAccountDTO).company_id === (destination as IBusinessAccountDTO).company_id && amount > 10000)
    errors.push('Amount must be under or equal to 10000 for same company');
  if ((source as IBusinessAccountDTO).company_id !== (destination as IBusinessAccountDTO).company_id && amount > 1000)
    errors.push('Amount must be under or equal to 1000 for different companies');

  if (errors.length > 0) return errors;
  return ['true'];
}

export function isLimitValidB2I(source: IAccountDTO, 
  destination: IAccountDTO, amount: number): string[] {
  const errors : string[] = [];
  if (amount > 1000) errors.push(`Amount must be under or equal to 1000 while transfring from ${source.type_name} account to ${destination.type_name} account`);
  if (errors.length > 0) return errors;
  return ['true'];
}

export function isLimitValidF2B(source: IAccountDTO, 
  destination: IAccountDTO, amount: number): string[] {
  const errors : string[] = [];
  if (amount > 5000) errors.push(`Amount must be under or equal to 5000 while transfring from ${source.type_name} account to ${destination.type_name} account`);
  if (errors.length > 0) return errors;
  return ['true'];
}


export const ValidationStringToFuncPointer : IValidationStringToFuncPointer = {
  'isValidTypesB2B': isValidTypesB2B,
  'isSameCurrency':isSameCurrency,
  'isDifferentCurrency' : isDifferentCurrency,
  'isValidBalanceB2B' : isValidBalanceB2B,
  'isValidBalanceB2I' : isValidBalanceB2I,
  'isValidTypesB2I' : isValidTypesB2I,
  'isActiveAccounts': isActiveAccounts,
  'isLimitValidB2B' : isLimitValidB2B,
  'isLimitValidB2I': isLimitValidB2I,
  'isActiveAccountsF2B': isActiveAccountsF2B,
  'isValidTypesF2B': isValidTypesF2B,
  'isSameCurrencyF2B' : isSameCurrencyF2B,
  'isValidBalanceF2B' : isValidBalanceF2B,
  'isLimitValidF2B' : isLimitValidF2B,
  'isAllGivenType' : isAllGivenType,
  'isAllStatusGivenAccounts' : isAllStatusGivenAccounts,
};