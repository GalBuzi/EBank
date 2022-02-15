import { IAccountDTO, IAddressDTO, IBusinessAccountDTO } from '../../src/types/dto.types';
import { IAddressModel, IBusinessAccountModel } from '../../src/types/models.types';
import { IAccountRecord, IAddressRecord, IBusinessAccountRecord } from '../../src/types/records.type';
import { RowDataBusiness } from '../../src/types/rowData.types';

export const buisnessRow : RowDataBusiness = {
  'business_account_id': 3,
  'company_id': 1,
  'company_name': 'Rapyd',
  'context': 'Fintech',
  'account_id' : 2,
  'status_name' : 'active',
  'currency': 'ILS',
  'balance': 10000,
  'status_id': 1,
  'type_name': 'business',
  'address_id' : 5,
  'postal_code' : 50,
  'city' : 'Petah Tikva',
  'region' : 'Merkaz',
  'street_name' : 'Ehad Haam',
  'street_number' : 5,
  'country_name' : 'Israel',
  'country_code' : 'ISR',
};
export const businessAddressModel : IAddressModel = {
  'country_name' : 'Israel',
  'country_code' : 'ISR',
  'postal_code' : 50,
  'city' : 'Petah Tikva',
  'region' : 'Merkaz',
  'street_name' : 'Ehad Haam',
  'street_number' : 5,
};
export const businessModel : IBusinessAccountModel = {
  'company_id': 1,
  'company_name': 'Rapyd',
  'context': 'Fintech',
  'address': businessAddressModel,
  'currency' : 'ISL',
  'balance' : 10000,
  'status_id' : 1,
  'type_name' : 'business',
};
export const accountToInsertBusiness : IAccountRecord = {
  'currency': 'ILS',
  'balance' : 10000,
  'status_id' : 1,
  'type_name' : 'business',
};
export const addressToInsertBusiness : IAddressRecord = {
  'city' : 'Petah Tikva',
  'country_code' : 'ISR',
  'country_name' : 'Israel',
  'postal_code' : 50,
  'region' : 'Merkaz',
  'street_name' : 'Ehad Haam',
  'street_number' : 5,
};

export const businessToInsert : IBusinessAccountRecord = {
  'company_id' : 1,
  'company_name' : 'Rapyd',
  'account_id' : 2,
  'context' : 'Fintech',
  'address_id' : 5, 
};

export const businessAccounttDto : IAccountDTO = {
  'account_id' : 2,
  'status_name' : 'active',
  'currency': 'ILS',
  'balance': 10000,
  'status_id': 1,
  'type_name': 'business',
};
export const businessAddressdto : IAddressDTO = {
  'address_id' : 5,
  'country_name' : 'Israel',
  'country_code' : 'ISR',
  'postal_code' : 50,
  'city' : 'Petah Tikva',
  'region' : 'Merkaz',
  'street_name' : 'Ehad Haam',
  'street_number' : 5,
};

export const businessDto : IBusinessAccountDTO = {
  'business_account_id': 3,
  'company_id': 1,
  'company_name': 'Rapyd',
  'context': 'Fintech',
  'address': businessAddressdto,
  'account_id' : 2,
  'status_name' : 'active',
  'currency': 'ILS',
  'balance': 10000,
  'status_id': 1,
  'type_name': 'business',
};

export const businessToInsertNoIds : IBusinessAccountRecord = {
  'company_id' : 1,
  'company_name' : 'Rapyd',
  'account_id' : -1,
  'context' : 'Fintech',
  'address_id' : -1,
};