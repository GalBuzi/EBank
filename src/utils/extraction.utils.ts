import { IBusinessAccountModel, IFamilyAccountModel, IIndividualAccountModel } from '../types/models.types.js';
import { IAccountRecord, IAddressRecord, IBusinessAccountRecord, IFamilyAccountRecord, IIndividualAccountRecord } from '../types/records.type.js';
type ModelsWithAccounts = IIndividualAccountModel | IBusinessAccountModel | IFamilyAccountModel;
type ModelsWithAddress = IIndividualAccountModel | IBusinessAccountModel;

export function extractAccountRecord(model: ModelsWithAccounts): IAccountRecord {
  const accountToInsert: IAccountRecord = {
    currency: model.currency,
    type_name: model.type_name,
    balance: model.balance,
    status_id: model.status_id,
  };
  return accountToInsert;
}
export function extractAddressRecord(model: ModelsWithAddress): IAddressRecord {
  const addressToInsert: IAddressRecord = {
    country_name: model.address.country_name,
    country_code: model.address.country_code,
    postal_code: model.address.postal_code,
    city: model.address.city,
    region: model.address.region,
    street_name: model.address.street_name,
    street_number: model.address.street_number,
  };
  return addressToInsert;
}
export function extractIndividualRecord(model: IIndividualAccountModel): IIndividualAccountRecord {
  const individualToInsert: IIndividualAccountRecord = {
    individual_id: model.individual_id,
    first_name: model.first_name,
    last_name: model.last_name,
    email: model.email,
    address_id: -1,
    account_id: -1,
  };
  return individualToInsert;
}
export function extractBusinessRecord(model: IBusinessAccountModel): IBusinessAccountRecord {
  const businessToInsert: IBusinessAccountRecord = {
    company_name: model.company_name,
    company_id: model.company_id,
    context: model.context,
    address_id: -1,
    account_id: -1,
  };
  return businessToInsert;
}
export function extractFamilyRecord(model: IFamilyAccountModel): IFamilyAccountRecord {
  const familyToInsert: IFamilyAccountRecord = {
    account_id: -1,
    context: model.context,
  };
  return familyToInsert;
}
export function extractOwnersIds(model: IFamilyAccountModel): number[] {
  const ownersToInsert: number[] = model.owners.map(tuple => {
    const id = tuple[0];
    return id;
  });
  return ownersToInsert;
}