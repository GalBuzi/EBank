import * as MODELS from  './models.types.js';

export interface IIndividualAccountDTO extends MODELS.IIndividualAccount {
  account_id : number
}

export interface IBusinessAccountDTO extends MODELS.IBusinessAccount {
  account_id : number
}

export interface IFamilyAccountDTO extends MODELS.IFamilyAccount {
  account_id : number
}