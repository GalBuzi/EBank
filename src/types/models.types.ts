/**
 * The models below represent the data coming from the request 
 */
export interface IAddressModel {
  country_name: string;
  country_code: string;
  postal_code: number;
  city: string;
  region: string;
  street_name: string;
  street_number: number;
}

export interface IAccountModel {
  currency: string;
  balance: number;
  status_id: number;
  type_name: string;
}

export interface IBusinessAccountModel extends IAccountModel {
  company_id: number;
  company_name: string;
  context: string;
  address: IAddressModel;
}

export interface IIndividualAccountModel extends IAccountModel {
  individual_id: number;
  first_name: string;
  last_name: string;
  email: string;
  address: IAddressModel;
}
export interface IFamilyAccountModel extends IAccountModel {
  owners: number[][];
  context: string;
}

export interface IChangeStatus {
  ids : number[];
  action : string;
}

export interface IChangeStatusResponse {
  ids : number[],
  status : string
}

export interface IModifyFamilyAccount {
  individuals : number[][]
}


