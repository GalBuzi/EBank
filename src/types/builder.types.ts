import { IAccountDTO, IBusinessAccountDTO, IIndividualAccountDTO } from './dto.types.js';

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

export interface RowDataFamily extends IAccountDTO {
  owners : number,
  context : string,
  family_account_id : number,
  indiv_account_id : number
}

export type RowDataAccount = RowDataIndividual | RowDataBusiness | RowDataFamily;

