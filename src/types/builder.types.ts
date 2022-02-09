import { IAccountDTO, IBusinessAccountDTO, IIndividualAccountDTO } from './dto_models.types.js';

export interface RowDataIndividual extends IAccountDTO {
  individual_account_id: number;
  address_id: number;
  individual_id: number;
  first_name: string;
  last_name: string;
  email: string;
  street_name: string;
  street_number: number;
  postal_code: number;
  country_code: string;
  country_name: string;
  city: string;
  region: string;
}

export interface RowDataBusiness extends IAccountDTO {
  business_account_id: number;
  address_id: number;
  company_id: number;
  company_name: string;
  context: string;
  street_name: string;
  street_number: number;
  postal_code: number;
  country_code: string;
  country_name: string;
  city: string;
  region: string;
}

// export interface RowDataFamilyShort extends IAccountDTO {
//   family_account_id : number,
//   context : string,
//   individual_account_id : number
// }

// export interface RowDataFamilyLong extends IAccountDTO {
//   family_account_id : number,
//   context : string,
//   individual_account_id : number
// }

// export type RowDataAccount = RowDataIndividual | RowDataBusiness;
// export type AccountDTO = IIndividualAccountDTO | IBusinessAccountDTO;

// export interface Converter {
//   convertRowsDataToDTO(T:RowDataAccount[]) : AccountDTO[];
// }

// function formatToBusinessDTO(element : RowDataBusiness) : IBusinessAccountDTO { 
//   const account : IBusinessAccountDTO = {
//     business_account_id : element.business_account_id,
//     address_id : element.address_id,
//     account_id : element.account_id,
//     company_id : element.company_id,
//     company_name : element.company_name,
//     context : element.context,
//     currency : element.currency,
//     balance : element.balance,
//     status_id : element.status_id,
//     type_name : element.type_name,
//     address : {
//       street_name : element.street_name,
//       street_number : element.street_number,
//       postal_code : element.postal_code,
//       country_code : element.country_code,
//       country_name : element.country_name,
//       city : element.city,
//       region : element.region,
//     },
//   };
//   return account;
// }

// export function buildDTOArr<T extends RowDataAccount>(data : T[]) : AccountDTO[] {
//   const accounts : AccountDTO[] = [];
//   switch (data[0].type_name) {
//     case 'business':
//       for (const element of data) { 
//         let formatted;
//         formatted = formatToBusinessDTO(element as RowDataBusiness);
//         accounts.push(formatted);
//       }
//       return accounts as IBusinessAccountDTO[];
    
//     case 'individual':
//       for (const element of data) { 
//         let formatted;
//         formatted = formatToIndividualDTO(element as RowDataIndividual);
//         accounts.push(formatted);
//       }
//       return accounts as IIndividualAccountDTO[];
  
//     default:
//       return accounts;
//   }
// }
export type RowDataAccount = RowDataIndividual | RowDataBusiness;
export type AccountDTO = IIndividualAccountDTO | IBusinessAccountDTO;

function formatToBusinessDTO(element: RowDataBusiness): IBusinessAccountDTO {
  const account: IBusinessAccountDTO = {
    business_account_id: element.business_account_id,
    address_id: element.address_id,
    account_id: element.account_id,
    company_id: element.company_id,
    company_name: element.company_name,
    context: element.context,
    currency: element.currency,
    balance: element.balance,
    status_id: element.status_id,
    type_name: element.type_name,
    address: {
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

function formatToIndividualDTO(element: RowDataIndividual): IIndividualAccountDTO {
  const account: IIndividualAccountDTO = {
    individual_account_id: element.individual_account_id,
    individual_id: element.individual_id,
    first_name: element.first_name,
    last_name: element.last_name,
    email: element.email,
    address_id: element.address_id,
    account_id: element.account_id,
    currency: element.currency,
    balance: element.balance,
    status_id: element.status_id,
    type_name: element.type_name,
    address: {
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

export function buildDTOArr<T extends RowDataAccount>(data: T[]): AccountDTO[] {
  const accounts: AccountDTO[] = [];
  switch (data[0].type_name) {
    case 'business':
      for (const element of data) {
        let formatted;
        formatted = formatToBusinessDTO(element as RowDataBusiness);
        accounts.push(formatted);
      }
      return accounts as IBusinessAccountDTO[];

    case 'individual':
      for (const element of data) {
        let formatted;
        formatted = formatToIndividualDTO(element as RowDataIndividual);
        accounts.push(formatted);
      }
      return accounts as IIndividualAccountDTO[];

    default:
      return accounts;
  }
}
