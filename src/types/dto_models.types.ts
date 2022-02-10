import * as MODELS from './models.types.js';

/**
 * The models beloew are used to represent the model send back to the user
 */
export interface IAccountDTO extends MODELS.IAccountModel {
  account_id: number;
}

export interface IIndividualAccountDTO extends MODELS.IIndividualAccountModel {
  individual_account_id: number;
  address_id: number;
  account_id: number;
}

export interface IBusinessAccountDTO extends MODELS.IBusinessAccountModel {
  account_id: number;
  business_account_id: number;
  address_id: number;
}

export interface IFamilyAccountDTO extends MODELS.IAccountModel {
  owners: number[] | IIndividualAccountDTO[];
  context: string;
  family_account_id : number,
  account_id : number
}

export interface IAddressDTO extends MODELS.IAddressModel {
  address_id: number;
}

/**
 * The models beloew represent the data inserted to the db
 */

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
