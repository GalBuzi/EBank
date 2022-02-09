import { IBusinessAccountDTO, ITransferResult } from '../types/dto_models.types.js';
import { IBusinessAccountModel, IAccountModel, IAddressModel, ITransferB2B } from '../types/models.types.js';
import { extractDataFromBusinessModel } from '../types/extractor.types.js';
import * as accountRepository from '../repositories/SQLRepository/account.repository.js';
import * as addressRepository from '../repositories/SQLRepository/address.repository.js';
import * as businessRepository from '../repositories/SQLRepository/business.repository.js';
import * as builder from '../types/builder.types.js';
import { ValidationException } from '../exceptions/ValidationException.excpetions.js';
import { getIndividualAccountById } from '../repositories/SQLRepository/individual.repository.js';

export async function createBusinessAccount(business_model : IBusinessAccountModel):Promise<IBusinessAccountDTO>{
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

export async function getBusinessAccountById(business_id : number) : Promise<IBusinessAccountDTO> {
  const businessObject = await businessRepository.getBusinessAccountById(business_id);
  const businessDTOArr = builder.buildDTOArr([businessObject])  as IBusinessAccountDTO[];
  return businessDTOArr[0];
}

export async function getAllBusinessAccount() : Promise<IBusinessAccountDTO[]> {
  const businessObject = await businessRepository.getAllBusinessAccount();
  const businessDTOArr : IBusinessAccountDTO[] = builder.buildDTOArr(businessObject) as IBusinessAccountDTO[];
  return businessDTOArr;
}

export async function transferB2B(data : ITransferB2B) : Promise<ITransferResult> {
  const source = await getBusinessAccountById(data.sourceAccount);
  const destination = await getBusinessAccountById(data.destinationAccount);
  if (source.company_id === destination.company_id) {
    if (data.amount > 10000) throw new ValidationException('Amount must be less or equal than 10000');
  } else {
    if (data.amount > 1000) throw new ValidationException('Amount must be equal or less than 1000');
  }
  await businessRepository.transferB2B(data);
  const sourceUpdated = await getBusinessAccountById(data.sourceAccount);
  const destinationUpdated = await getBusinessAccountById(data.destinationAccount);
  const result : ITransferResult = {
    sourceAccount : {
      id : sourceUpdated.business_account_id,
      balance : sourceUpdated.balance,
      currency : sourceUpdated.currency,
    },
    destinationAccount : {
      id : destinationUpdated.business_account_id,
      balance : destinationUpdated.balance,
      currency : destinationUpdated.currency,
    },
  };
  return result;
}

export async function transferB2I(data : ITransferB2B) : Promise<ITransferResult> {
  if (data.amount > 1000) throw new ValidationException('Amount has to be less or equal than 1000');
  const source = await getBusinessAccountById(data.sourceAccount);
  const destination = await getIndividualAccountById(data.destinationAccount);
  await businessRepository.transferB2B(data);
  const sourceUpdated = await getBusinessAccountById(data.sourceAccount);
  const destinationUpdated = await getIndividualAccountById(data.destinationAccount);
  const result : ITransferResult = {
    sourceAccount : {
      id : sourceUpdated.business_account_id,
      balance : sourceUpdated.balance,
      currency : sourceUpdated.currency,
    },
    destinationAccount : {
      id : destinationUpdated.individual_account_id,
      balance : destinationUpdated.balance,
      currency : destinationUpdated.currency,
    },
  };
  return result;
}



