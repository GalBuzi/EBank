import { IIndividualAccountModel } from '../types/models.types.js';
import * as accountRepository from '../repositories/SQLRepository/account.repository.js';
import * as individualRepository from '../repositories/SQLRepository/individual.repository.js';
import * as addressRepository from '../repositories/SQLRepository/address.repository.js';
import { IIndividualAccountDTO } from '../types/dto_models.types.js';
import { extractDataFromIndividualModel } from '../types/extractor.types.js';
import * as builder from '../types/builder.types.js';
import { ServerException } from '../exceptions/ServerExcpetion.exceptions.js';
export async function createIndividualAcc(
  payload: IIndividualAccountModel,
): Promise<IIndividualAccountDTO> {
  const { accountToInsert, addressToInsert, individualToInsert } =
    extractDataFromIndividualModel(payload);
  const createdAccount = await accountRepository.createAccount(accountToInsert);
  const cretedAddress = await addressRepository.createAddress(addressToInsert);
  individualToInsert.account_id = createdAccount.account_id;
  individualToInsert.address_id = cretedAddress.address_id;
  const individualAccount = await individualRepository.createIndividualAccount(individualToInsert);
  const individualDTOArr = builder.buildDTOArr([individualAccount]) as IIndividualAccountDTO[];
  return individualDTOArr[0];
}

// export async function getAllIndividualAcc(): Promise<IIndividualAccountDTO[]> {
//   const allAccounts = await individualRepository.getAllIndividualsAcc();
//   const accountsDTOArr = builder.buildDTOArr(allAccounts) as IIndividualAccountDTO[];
//   return accountsDTOArr;
// }

export async function getIndividualById(id: number): Promise<IIndividualAccountDTO> {
  const individualAccount = await individualRepository.getIndividualAccountById(id);
  if (!individualAccount) throw new ServerException(`Individual account with id ${id} not found`);
  const formattedAccount = builder.buildDTOArr([individualAccount]) as IIndividualAccountDTO[];
  return formattedAccount[0];
}
