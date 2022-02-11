import { IBusinessAccountDTO, IFamilyAccounBaseDTO, IGenericDTO, IIndividualAccountDTO } from '../types/dto.types.js';
import { RowDataBusiness, RowDataFamily, RowDataIndividual } from '../types/rowData.types.js';
export interface IMapStringToFunc {
  [key: string]: (...args: any) => IGenericDTO;
}

export function formatToBusinessDTO(element: RowDataBusiness): IBusinessAccountDTO {
  const account: IBusinessAccountDTO = {
    business_account_id: element.business_account_id,
    account_id: element.account_id,
    company_id: element.company_id,
    company_name: element.company_name,
    context: element.context,
    currency: element.currency,
    balance: element.balance,
    status_id: element.status_id,
    type_name: element.type_name,
    address: {
      address_id : element.address_id,
      street_name: element.street_name,
      street_number: element.street_number,
      postal_code: element.postal_code,
      country_code: element.country_code,
      country_name: element.country_name,
      city: element.city,
      region: element.region,
    },
  };
  return account;
}
export function formatDataToFamilyDTO(element : RowDataFamily) : IFamilyAccounBaseDTO{
  const account : IFamilyAccounBaseDTO = {
    account_id : element.account_id,
    context : element.context,
    currency : element.currency,
    balance : element.balance,
    status_id : element.status_id,
    type_name : element.type_name,
    family_account_id : element.family_account_id,
  };
  return account;
}
export function formatToIndividualDTO(element: RowDataIndividual): IIndividualAccountDTO {
  const account: IIndividualAccountDTO = {
    individual_account_id: element.individual_account_id,
    individual_id: element.individual_id,
    first_name: element.first_name,
    last_name: element.last_name,
    email: element.email,
    account_id: element.account_id,
    currency: element.currency,
    balance: element.balance,
    status_id: element.status_id,
    type_name: element.type_name,
    address: {
      address_id : element.address_id,
      street_name: element.street_name,
      street_number: element.street_number,
      postal_code: element.postal_code,
      country_code: element.country_code,
      country_name: element.country_name,
      city: element.city,
      region: element.region,
    },
  };
  return account;
}
export function formatRowsDataToFamilyDTO(element : RowDataFamily) : IFamilyAccounBaseDTO{
  const account : IFamilyAccounBaseDTO = {
    account_id : element.account_id,
    context : element.context,
    currency : element.currency,
    balance : element.balance,
    status_id : element.status_id,
    type_name : element.type_name,
    family_account_id : element.family_account_id,
  };
  return account;
}
export const myMap : IMapStringToFunc = {
  'formatToIndividualDTO' : formatToIndividualDTO,
  'formatToBusinessDTO' : formatToBusinessDTO,
  'formatDataToFamilyDTO' : formatDataToFamilyDTO,
};


