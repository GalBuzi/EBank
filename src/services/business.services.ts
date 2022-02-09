import { IBusinessAccountDTO } from '../types/dto_models.types.js';
import { IBusinessAccountModel, ITransferResult } from '../types/models.types.js';
import { extractDataFromBusinessModel } from '../types/extractor.types.js';
import * as accountRepository from '../repositories/SQLRepository/account.repository.js';
import * as addressRepository from '../repositories/SQLRepository/address.repository.js';
import * as businessRepository from '../repositories/SQLRepository/business.repository.js';
import * as builder from '../types/builder.types.js';
import { validateTransferB2B, validateTransferB2I } from '../utils/transfer.validator.utils.js';
import { ServerException } from '../exceptions/ServerExcpetion.exceptions.js';
import { getRate } from '../utils/helpers.utils.js';

export async function createBusinessAccount(
  business_model: IBusinessAccountModel,
): Promise<IBusinessAccountDTO> {
  const { accountToInsert, addressToInsert, businessToInsert } =
    extractDataFromBusinessModel(business_model);
  const createdAccount = await accountRepository.createAccount(accountToInsert);
  const createdAddress = await addressRepository.createAddress(addressToInsert);
  businessToInsert.account_id = createdAccount.account_id;
  businessToInsert.address_id = createdAddress.address_id;
  const businessAccountCreated = await businessRepository.createBusinessAccount(businessToInsert);
  const businessDTOArr = builder.buildDTOArr([businessAccountCreated]) as IBusinessAccountDTO[];
  return businessDTOArr[0];
}

export async function getBusinessAccountById(business_id: number): Promise<IBusinessAccountDTO> {
  const businessObject = await businessRepository.getBusinessAccountById(business_id);
  if (!businessObject) throw new ServerException(`Business with id ${business_id} doesn't exists!`);
  const businessDTOArr = builder.buildDTOArr([businessObject]) as IBusinessAccountDTO[];
  return businessDTOArr[0];
}

// export async function getAllBusinessAccount(): Promise<IBusinessAccountDTO[]> {
//   const businessObject = await businessRepository.getAllBusinessAccount();
//   const businessDTOArr: IBusinessAccountDTO[] = builder.buildDTOArr(
//     businessObject,
//   ) as IBusinessAccountDTO[];
//   return businessDTOArr;
// }

export async function transferB2B(
  sourceId: number,
  destinationId: number,
  amount: number,
  flag?: string,
): Promise<ITransferResult> {
  let toDeposit: number;
  const { source, destination } = await validateTransferB2B(sourceId, destinationId, amount, flag);
  if (flag) {
    toDeposit = amount * await getRate(source.currency, destination.currency);
  } else {
    toDeposit = amount;
  }
  await businessRepository.transferB2B(source, destination, amount, toDeposit);
  const result: ITransferResult = {
    sourceAccount: {
      id: source.business_account_id,
      balance: source.balance - amount,
      currency: source.currency,
    },
    destinationAccount: {
      id: destination.business_account_id,
      balance: destination.balance + toDeposit,
      currency: destination.currency,
    },
  };
  return result;
}

export async function transferB2I(
  sourceId: number,
  destinationId: number,
  amount: number,
): Promise<ITransferResult> {
  const { source, destination } = await validateTransferB2I(sourceId, destinationId, amount);
  await businessRepository.transferB2I(source, destination, amount);
  const result: ITransferResult = {
    sourceAccount: {
      id: source.business_account_id,
      balance: source.balance - amount,
      currency: source.currency,
    },
    destinationAccount: {
      id: destination.individual_account_id,
      balance: destination.balance + amount,
      currency: destination.currency,
    },
  };
  return result;
}
