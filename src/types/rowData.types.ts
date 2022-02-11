/**
 * Represents the data coming back from the sql query
 */
export interface RowDataAccount {
  account_id: number;
  currency: string;
  balance: number;
  status_id: number;
  type_name: string;
}

export interface RowDataAddress {
  address_id: number;
  street_name: string;
  street_number: number;
  postal_code: number;
  country_code: string;
  country_name: string;
  city: string;
  region: string;
}

export interface RowDataIndividual extends RowDataAccount, RowDataAddress {
  individual_account_id: number;
  individual_id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface RowDataBusiness extends RowDataAccount, RowDataAddress {
  business_account_id: number;
  company_id: number;
  company_name: string;
  context: string;
}

export interface RowDataFamily extends RowDataAccount {
  context: string;
  family_account_id: number;
  indiv_account_id: number;
}

export type RowDataAccountAll = | RowDataIndividual | RowDataBusiness | RowDataFamily;


