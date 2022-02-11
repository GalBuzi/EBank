import {
  IAccountModel,
  IAddressModel,
  IBusinessAccountModel,
  IFamilyAccountModel,
  IIndividualAccountModel,
} from '../types/models.types.js';
import { IBusinessAccountRecord, IFamilyAccountRecord, IIndividualAccountRecord } from './records.type.js';

interface ExtractDataFromIndividualModel {
  accountToInsert: IAccountModel;
  addressToInsert: IAddressModel;
  individualToInsert: IIndividualAccountRecord;
}

export function extractDataFromIndividualModel(
  individual_model: IIndividualAccountModel,
): ExtractDataFromIndividualModel {
  const accountToInsert: IAccountModel = {
    currency: individual_model.currency,
    type_name: individual_model.type_name,
    balance: individual_model.balance,
    status_id: individual_model.status_id,
  };

  const addressToInsert: IAddressModel = {
    country_name: individual_model.address.country_name,
    country_code: individual_model.address.country_code,
    postal_code: individual_model.address.postal_code,
    city: individual_model.address.city,
    region: individual_model.address.region,
    street_name: individual_model.address.street_name,
    street_number: individual_model.address.street_number,
  };

  const individualToInsert: IIndividualAccountRecord = {
    individual_id: individual_model.individual_id,
    first_name: individual_model.first_name,
    last_name: individual_model.last_name,
    email: individual_model.email,
    address_id: -1,
    account_id: -1,
  };

  const res: ExtractDataFromIndividualModel = {
    accountToInsert,
    addressToInsert,
    individualToInsert,
  };

  return res;
}

interface ExtractDataFromFamilyModel {
  accountToInsert : IAccountModel,
  familyToInsert : IFamilyAccountRecord,
  ownersToInsert : number[]
}

export function extractDataFromFamilyModel(model : IFamilyAccountModel) : ExtractDataFromFamilyModel {
  const accountToInsert: IAccountModel = {
    currency: model.currency,
    type_name: model.type_name,
    balance: model.balance,
    status_id: model.status_id,
  };
  const familyToInsert : IFamilyAccountRecord = {
    account_id: -1,
    context: model.context,
  };
  const ownersToInsert : number[] = model.owners.map((tuple) => {
    const id = tuple[0];
    return id;
  });
  
  const res : ExtractDataFromFamilyModel = {
    accountToInsert,
    familyToInsert,
    ownersToInsert,
  };
  return res;
}

interface ExtractDataFromBusinessModel {
  accountToInsert: IAccountModel;
  addressToInsert: IAddressModel;
  businessToInsert: IBusinessAccountRecord;
}

export function extractDataFromBusinessModel(
  model: IBusinessAccountModel,
): ExtractDataFromBusinessModel {
  const accountToInsert: IAccountModel = {
    currency: model.currency,
    type_name: model.type_name,
    balance: model.balance,
    status_id: model.status_id,
  };

  const addressToInsert: IAddressModel = {
    country_name: model.address.country_name,
    country_code: model.address.country_code,
    postal_code: model.address.postal_code,
    city: model.address.city,
    region: model.address.region,
    street_name: model.address.street_name,
    street_number: model.address.street_number,
  };

  const businessToInsert: IBusinessAccountRecord = {
    company_name: model.company_name,
    company_id: model.company_id,
    context: model.context,
    address_id: -1,
    account_id: -1,
  };

  const res: ExtractDataFromBusinessModel = {
    accountToInsert,
    addressToInsert,
    businessToInsert,
  };

  return res;
}
