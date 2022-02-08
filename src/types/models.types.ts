
/**
 * The models beloew represent the data coming from the request to build the models
 * that are inserted to the DB
 */
export interface IAddressModel {
  country_name : string,
  country_code : string,
  postal_code : number,
  city : string,
  region : string,
  street_name : string,
  street_number : number
}

export interface IAccountModel {
  currency : string,
  balance : number,
  status_id : number,
  type_name : string 
}


export interface IBusinessAccountModel extends IAccountModel {
  company_id : number,
  company_name : string,
  context : string
  address : IAddressModel
}

export interface IIndividualAccountModel extends IAccountModel {
  individual_id : number,
  first_name : string,
  last_name: string,
  email : string,
  address : IAddressModel
}
export interface IFamilyAccountModel extends IAccountModel {
  owners : IIndividualAccountModel[],
  context : string
}
