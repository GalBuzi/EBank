/**
 * Records to be inserted to the DB tables
 */
<<<<<<< HEAD

=======
>>>>>>> upstream/formattingProject
export interface IAccountRecord {
  currency: string;
  balance: number;
  status_id: number;
  type_name: string;
}

export interface IIndividualAccountRecord {
  individual_id: number;
  first_name: string;
  last_name: string;
  email: string;
  address_id: number;
  account_id: number;
}
export interface IBusinessAccountRecord {
  company_id: number;
  company_name: string;
  context: string;
  address_id: number;
  account_id: number;
}

export interface IFamilyAccountRecord {
  account_id: number;
  context: string;
}

<<<<<<< HEAD
export interface IAddressRecord { 
=======
export interface IAddressRecord {
>>>>>>> upstream/formattingProject
  country_name: string;
  country_code: string;
  postal_code: number;
  city: string;
  region: string;
  street_name: string;
  street_number: number;
}