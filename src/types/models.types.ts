export interface IAddress {
  address_id : number, 
  country_name : string,
  country_code : string,
  postal_code : number,
  city : string,
  region : string,
  street_name : string,
  street_number : number
}

export interface IAccount {
  currency : string,
  balance : number,
  status_id : number,
  type_name : string 
}



export interface IAccountUpdate {
  currency? : string,
  balance? : number,
  status? : string,
  type? : string 
}

export interface IBusinessAccount extends IAccount, IAddress {
  company_id : number,
  company_name : string,
  context : string
}

export interface IBusinessAccountUpdate extends IAccount, IAddress {
  company_id? : number,
  company_name? : string,
  context? : string
}

export interface IIndividualAccount extends IAccount, IAddress {
  individual_id : number,
  first_name : string,
  last_name: string,
  email : string
}

export interface IIndividualAccountUpdate extends IAccount, IAddress {
  individual_id? : number,
  first_name? : string,
  last_name? : string,
  email? : string
}

export interface IFamilyAccount extends IAccount {
  owners : IIndividualAccount[],
  context : string
}

export interface IFamilyAccountUpdate extends IAccount {
  owners? : IIndividualAccount[],
  context? : string
}