import { IAccountDTO, IFamilyAccounBaseDTO, IFamilyAccountDTOShort } from '../../src/types/dto.types';
import { IFamilyAccountModel, IModifyFamilyAccount } from '../../src/types/models.types';
import { IAccountRecord, IFamilyAccountRecord } from '../../src/types/records.type';
import { RowDataFamily, RowDataFamilyNoOwners } from '../../src/types/rowData.types';

const ownersWithAmount = [[1, 3000], [2, 3000], [3, 3000]];
export const ownersLeft = [];
export const ownersAdded = [1, 2, 3, 4, 5];
export const owners = [1, 2, 3];
export const sum = 9000;

export const accountToInsertFamily : IAccountRecord = {
  'currency': 'ILS',
  'balance' : 30000,
  'status_id' : 1,
  'type_name' : 'family',
};

export const familyRecord : IFamilyAccountRecord = {
  'account_id' : 4,
  'context' : 'Some context',
};

export const familyToInsertNoId : IFamilyAccountRecord = {
  'account_id' : -1,
  'context' : 'Some context',
};

export const familyAccountDto : IAccountDTO = {
  'account_id' : 4,
  'status_name' : 'active',
  'currency': 'ILS',
  'balance': 30000,
  'status_id': 1,
  'type_name': 'family',
};
export const rowDataFamilyNoOwners : RowDataFamilyNoOwners = {
  'account_id' : 4,
  'status_name' : 'active',
  'currency': 'ILS',
  'balance': 30000,
  'status_id': 1,
  'type_name': 'family',
  'context' : 'Some context',
  'family_account_id' : 6,
};

export const familyDto : IFamilyAccounBaseDTO = {
  'account_id' : 4,
  'status_name' : 'active',
  'currency': 'ILS',
  'balance': 30000,
  'status_id': 1,
  'type_name': 'family',
  'context' : 'Some context',
  'family_account_id' : 6,
};

export const familyModel : IFamilyAccountModel = {
  'currency': 'ILS',
  'balance': 30000,
  'status_id': 1,
  'type_name': 'family',
  'owners' : ownersWithAmount,
  'context' : 'Some context',
};

export const familyRow : RowDataFamily = {
  'account_id' : 4,
  'status_name' : 'active',
  'currency': 'ILS',
  'balance': 30000,
  'status_id': 1,
  'type_name': 'family',
  'context' : 'Some context',
  'family_account_id' : 6,
  'indiv_account_id' : 1,
};

export const familyDTO : IFamilyAccounBaseDTO = {
  'account_id' : 4,
  'status_name' : 'active',
  'currency': 'ILS',
  'balance': 30000,
  'status_id': 1,
  'type_name': 'family',
  'context' : 'Some context',
  'family_account_id' : 6,
};

export const shortFamilyAccountDTO : IFamilyAccountDTOShort = {
  'family_account_id' : 6,
  'account_id' : 4,
  'status_name' : 'active',
  'balance': 30000,
  'status_id': 1,
  'type_name': 'family',
  'owners' : owners,
  'context' : 'Some context',
  'currency': 'ILS',
};

export const shortFamilyAccountRemovedDTO : IFamilyAccountDTOShort = {
  'family_account_id' : 6,
  'account_id' : 4,
  'status_name' : 'active',
  'balance': 21000,
  'status_id': 1,
  'type_name': 'family',
  'owners' : ownersLeft,
  'context' : 'Some context',
  'currency': 'ILS',
};

export const shortFamilyAccountAddedDTO : IFamilyAccountDTOShort = {
  'family_account_id' : 6,
  'account_id' : 4,
  'status_name' : 'active',
  'balance': 21000,
  'status_id': 1,
  'type_name': 'family',
  'owners' : ownersLeft,
  'context' : 'Some context',
  'currency': 'ILS',
};

export const toModifyFamily : IModifyFamilyAccount = {
  'individuals': ownersWithAmount,
};