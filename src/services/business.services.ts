import { IBusinessAccountDTO } from '../types/dto.types.js';
import { IBusinessAccountModel } from '../types/models.types.js';
import { ITransferResult } from '../types/transfers.type.js';
import businessRepository from '../repositories/SQLRepository/business.repository.js';
import { validateTransferB2B, validateTransferB2I, validateTransferB2BFX } from '../utils/validations/services.validator.utils.js';
import { getRate } from '../utils/helpers.utils.js';
import builderSQL from '../utils/builder.utils.js';
class BusinessAccountService  {
  async createBusinessAccount(business_model: IBusinessAccountModel): Promise<IBusinessAccountDTO> {
    const dtoBusi = await builderSQL.createBusinessAccount(business_model);
    return dtoBusi;
  }

  async getBusinessAccountById(business_id: number): Promise<IBusinessAccountDTO> {
    const dtoBusi = await builderSQL.getBusinessAccountById(business_id);
    return dtoBusi;
  }

  async transferB2B(
    sourceId: number,
    destinationId: number,
    amount: number,
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
