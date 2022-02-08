import { IBusinessAccountDTO } from '../types/dto_models.types.js';
import { IBusinessAccountModel, IAccountModel, IAddressModel } from '../types/models.types.js';
import { extractDataFromBusinessModel } from '../types/extractor.types.js';
import * as accountRepository from '../repositories/SQLRepository/account.repository.js';
import * as addressRepository from '../repositories/SQLRepository/address.repository.js';
import * as businessRepository from '../repositories/SQLRepository/business.repository.js';
import * as builder from '../types/builder.types.js';

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

// export async function updateBusinessById(id:number, payload : )
