/**
 * DTO are the response objects to user 
 */
export interface IAccountDTO {
  account_id: number;
  currency: string;
  balance: number;
  status_id: number;
  type_name: string;
  status_name : string
}

export interface IIndividualAccountDTO extends IAccountDTO {
  individual_account_id: number;
  individual_id: number;
  first_name: string;
  last_name: string;
  email: string;
  address: IAddressDTO;
}

export interface IBusinessAccountDTO extends IAccountDTO {
  business_account_id: number;
  company_id: number;
  company_name: string;
  context: string;
  address: IAddressDTO;
}

export interface IFamilyAccounBaseDTO extends IAccountDTO {
  context: string;
  family_account_id : number,
  account_id : number
}

export interface IFamilyAccountDTOShort extends IFamilyAccounBaseDTO {
  owners: number[];
}

export interface IFamilyAccountDTOLong extends IFamilyAccounBaseDTO {
  owners: IIndividualAccountDTO[];
}

export interface IAddressDTO {
  address_id: number;
  country_name: string;
  country_code: string;
  postal_code: number;
  city: string;
  region: string;
  street_name: string;
  street_number: number;
}

export type IFamilyAccountDTO = IFamilyAccountDTOShort | IFamilyAccountDTOLong;
export type IGenericDTO = IFamilyAccounBaseDTO | IBusinessAccountDTO | IIndividualAccountDTO;
