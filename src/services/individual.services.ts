import { IAccountModel, IAddressModel, IIndividualAccountModel  } from '../types/models.types.js';
import * as accountRepository from '../repositories/SQLRepository/account.repository.js';
import * as individualRepository from '../repositories/SQLRepository/individual.repository.js';
import * as addressRepository from '../repositories/SQLRepository/address.repository.js';
import { IIndividualAccountDTO, IIndividualAccountRecord } from '../types/dto_models.types.js';
import { extractDataFromIndividualModel } from '../types/extractor.types.js';
import {buildIndividualAccountsFromDB} from '../types/builder.types.js';

export async function createIndividualAcc(payload : IIndividualAccountModel) : Promise<IIndividualAccountDTO> {
  const { accountToInsert, addressToInsert, individualToInsert } = extractDataFromIndividualModel(payload);
  const createdAccount = await accountRepository.createAccount(accountToInsert);
  const cretedAddress = await addressRepository.createAddress(addressToInsert); 
  individualToInsert.account_id = createdAccount.account_id;
  individualToInsert.address_id = cretedAddress.address_id;
  const individualAccount = await individualRepository.createIndividualAccount(individualToInsert);
  return individualAccount;
}

export async function getAllIndividualAcc() : Promise<IIndividualAccountDTO[]> {
    const result = await individualRepository.getAllIndividualsAcc();
    const accounts = buildIndividualAccountsFromDB(result);
    return accounts;
}

export async function getIndividualById(id : number) : Promise<IIndividualAccountDTO> {
  const result = await individualRepository.getIndividualAccountById(id);
  const account = buildIndividualAccountsFromDB(result);
  return account[0];
}

export async function deleteIndividualById(id : number) : Promise<IIndividualAccountDTO> {
  const result = await individualRepository.deleteIndividualAccById(id);
  const account = buildIndividualAccountsFromDB(result);
  return account[0];
}



