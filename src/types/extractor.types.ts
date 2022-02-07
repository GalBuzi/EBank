import { IAccountModel, IAddressModel, IIndividualAccountModel } from '../types/models.types.js';
import { IIndividualAccountRecord } from '../types/dto_models.types.js';

interface ExtractDataFromIndividualModel {
  accountToInsert:IAccountModel;
  addressToInsert:IAddressModel
  individualToInsert:IIndividualAccountRecord
}
  
export function extractDataFromIndividualModel(individual_model:IIndividualAccountModel):ExtractDataFromIndividualModel {
  const accountToInsert : IAccountModel = {
    currency : individual_model.currency,
    type_name : individual_model.type_name,
    balance : individual_model.balance,
    status_id : individual_model.status_id,
  };
  
  const addressToInsert : IAddressModel = {
    country_name : individual_model.address.country_name,
    country_code : individual_model.address.country_code,
    postal_code : individual_model.address.postal_code,
    city : individual_model.address.city,
    region : individual_model.address.region,
    street_name : individual_model.address.street_name,
    street_number : individual_model.address.street_number,
  };
  
  const individualToInsert : IIndividualAccountRecord  = {
    individual_id : individual_model.individual_id,
    first_name : individual_model.first_name,
    last_name : individual_model.last_name,
    email : individual_model.email,
    address_id : -1,
    account_id : -1,
  };
  
  const res : ExtractDataFromIndividualModel = {
    accountToInsert,
    addressToInsert,
    individualToInsert,
  };
  
  return res;
}