import { IAccountModel, IAdressModel, IIndividualAccountModel  } from '../types/models.types.js';
import * as accountRepository from '../repositories/SQLRepository/account.repository.js';
import * as individualRepository from '../repositories/SQLRepository/individual.repository.js';
import * as addressRepository from '../repositories/SQLRepository/address.repository.js';
import { IIndividualAccountDTO, IIndividualAccountRecord } from '../types/dto_models.types.js';

export async function createIndividualAcc(payload : IIndividualAccountModel) : Promise<IIndividualAccountDTO> {
  const account : IAccountModel = {
    currency : payload.currency,
    type_name : payload.type_name,
    balance : payload.balance,
    status_id : payload.status_id,
  };
  const createdAccount = await accountRepository.createAccount(account);
  const addressToInsert : IAdressModel = {
    country_name : payload.address.country_name,
    country_code : payload.address.country_code,
    postal_code : payload.address.postal_code,
    city : payload.address.city,
    region : payload.address.region,
    street_name : payload.address.street_name,
    street_number : payload.address.street_number,
  };

  const address = await addressRepository.createAddress(addressToInsert);
  const individualToInsert : IIndividualAccountRecord  = {
    individual_id : payload.individual_id,
    first_name : payload.first_name,
    last_name : payload.last_name,
    email : payload.email,
    address_id : address.address_id,
    account_id : createdAccount.account_id,
  };
    
  const individualAccount = await individualRepository.createIndividualAccount(individualToInsert);
  return individualAccount;

}