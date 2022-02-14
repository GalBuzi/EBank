import { SSL_OP_CISCO_ANYCONNECT } from 'constants';
import sinon from 'sinon';
import { IAccountDTO, IAddressDTO, IIndividualAccountDTO } from '../../src/types/dto.types';
import builderSQL from '../../src/utils/builder.utils.js';
import accountRepository from '../../src/repositories/SQLRepository/account.repository.js';
import { expect } from 'chai';
import {
  IAccountModel,
  IAddressModel,
  IIndividualAccountModel,
} from '../../src/types/models.types';
import addressRepository from '../../src/repositories/SQLRepository/address.repository.js';
import individualRepository from '../../src/repositories/SQLRepository/individual.repository.js';
import { RowDataIndividual } from '../../src/types/rowData.types';

const individualDto: IIndividualAccountDTO = {
  individual_account_id: 31,
  individual_id: 14,
  first_name: 'gal',
  last_name: 'hara',
  email: 'hara',
  account_id: 91,
  currency: 'ILS',
  balance: 3000,
  status_id: 1,
  status_name: 'INACTIVE',
  type_name: 'individual',
  address: {
    address_id: 42,
    street_name: 'hara',
    street_number: 123,
    postal_code: 45,
    country_code: 'hara',
    country_name: 'hara',
    city: 'hara',
    region: 'hara',
  },
};
const addressDto: IAddressDTO = {
  address_id: 5,
  country_name: 'hara',
  country_code: 'hara',
  postal_code: 45,
  city: 'hara',
  region: 'hara',
  street_name: 'hara',
  street_number: 123,
};
const addressModel: IAddressModel = {
  country_name: 'Israel',
  country_code: 'ISR',
  postal_code: 45,
  city: 'Petah Tikva',
  region: 'Merkaz',
  street_name: 'Ehad Haam',
  street_number: 1,
};
const individualModel: IIndividualAccountModel = {
  type_name: 'individual',
  currency: 'ILS',
  balance: 10000,
  status_id: 1,
  individual_id: 66,
  first_name: 'gal',
  last_name: 'brakan',
  email: 'hgal@gmail.com',
  address: addressModel,
};

const accountModelDto: IAccountDTO = {
  account_id: 1,
  status_name: 'active',
  currency: 'ILS',
  balance: 10000,
  status_id: 1,
  type_name: 'individual',
};

const individualRow: RowDataIndividual = {
  individual_id: 65,
  type_name: 'individual',
  status_name: 'active',
  status_id: 1,
  account_id: 1,
  individual_account_id: 31,
  currency: 'ILS',
  city: 'Petah Tikva',
  country_code: 'ISR',
  country_name: 'Israel',
  balance: 10000,
  address_id: 5,
  postal_code: 45,
  region: 'hara',
  street_name: 'hara',
  street_number: 123,
  first_name: 'gal',
  last_name: 'brakan',
  email: 'gal@gmail.com',
};
describe('Testing creating an account', () => {
  it('Should create a new individual account and return the DTO', async () => {
    sinon.stub(builderSQL, 'createIndividualAccount').resolves(individualDto);
    sinon.stub(addressRepository, 'createAddress').resolves(addressDto);
    sinon.stub(individualRepository, 'createIndividualAccount').resolves(individualRow);
    const createdAccount = await builderSQL.createIndividualAccount(individualModel);
    expect(createdAccount).to.deep.equal(individualDto);
  });
});
