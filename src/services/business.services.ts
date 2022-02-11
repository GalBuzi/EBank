import { IBusinessAccountDTO } from '../types/dto.types.js';
import { IBusinessAccountModel } from '../types/models.types.js';
import { ITransferResult } from '../types/transfers.type.js';
import * as accountRepository from '../repositories/SQLRepository/account.repository.js';
import * as addressRepository from '../repositories/SQLRepository/address.repository.js';
import * as businessRepository from '../repositories/SQLRepository/business.repository.js';
import { validateTransferB2B, validateTransferB2I, validateTransferB2BFX } from '../utils/validations/transfer.validator.utils.js';
import { ServerException } from '../exceptions/ServerExcpetion.exceptions.js';
import { getRate } from '../utils/helpers.utils.js';
import * as EXTRACTOR from '../utils/extraction.utils.js';
import * as CONVERTER from '../utils/covnert.utils.js';
class BusinessAccountService  {
  async createBusinessAccount(business_model: IBusinessAccountModel): Promise<IBusinessAccountDTO> {
    const accountToInsert = EXTRACTOR.extractAccountRecord(business_model);
    const addressToInsert = EXTRACTOR.extractAddressRecord(business_model);
    const businessToInsert = EXTRACTOR.extractBusinessRecord(business_model);
    const createdAccount = await accountRepository.createAccount(accountToInsert);
    const createdAddress = await addressRepository.createAddress(addressToInsert);
    businessToInsert.account_id = createdAccount.account_id;
    businessToInsert.address_id = createdAddress.address_id;
    const businessAccountCreated = await businessRepository.createBusinessAccount(businessToInsert);
    const businessDTOArr = CONVERTER.convertRowsDataToDTO([businessAccountCreated], CONVERTER.FormatterMapper.formatToBusinessDTO) as IBusinessAccountDTO[];
    return businessDTOArr[0];
  }

  async getBusinessAccountById(business_id: number): Promise<IBusinessAccountDTO> {
    const businessObject = await businessRepository.getBusinessAccountById(business_id);
    if (!businessObject)
      throw new ServerException(`Business with id ${business_id} doesn't exists!`);
    const businessDTOArr = CONVERTER.convertRowsDataToDTO([businessObject], CONVERTER.FormatterMapper.formatToBusinessDTO) as IBusinessAccountDTO[];
    return businessDTOArr[0];
  }

  async transferB2B(
    sourceId: number,
    destinationId: number,
    amount: number,
    flag?: string,
  ): Promise<ITransferResult> {
    let toDeposit: number;
    const { source, destination } = await validateTransferB2B(
      sourceId,
      destinationId,
      amount);
    toDeposit = amount;
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

  async transferB2BFX(
    sourceId: number,
    destinationId: number,
    amount: number,
  ): Promise<ITransferResult> {
    let toDeposit: number;
    const { source, destination } = await validateTransferB2BFX(sourceId, destinationId, amount);  
    toDeposit = amount * (await getRate(source.currency, destination.currency));
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

  async transferB2I(
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
}

const instance = new BusinessAccountService();
export default instance;
