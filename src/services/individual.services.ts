import { IIndividualAccountModel } from '../types/models.types.js';
import { IIndividualAccountDTO } from '../types/dto.types.js';
import builderSQL from '../utils/builder.utils.js';
import { ITransferResult } from '../types/transfers.type.js';
import individualRepository from '../repositories/SQLRepository/individual.repository.js';
class IndividualAccountService {

  async createIndividualAcc(
    payload: IIndividualAccountModel,
  ): Promise<IIndividualAccountDTO> {
    const dtoIndiv = await builderSQL.createIndividualAccount(payload);
    return dtoIndiv;
  }
  
  async getListOfIndividualsById(ids: number[]): Promise<IIndividualAccountDTO[]> {
    const dtoIndiv = await builderSQL.getListOfIndividualsAccountsById(ids);
    return dtoIndiv;
  }

  async getIndividualById(id: number): Promise<IIndividualAccountDTO> {
    const dtoIndiv = await builderSQL.getIndividualAccountById(id);
    return dtoIndiv;
  }

  async transferI2F(sourceId : number, destinationId : number, amount : number) : Promise<ITransferResult>{
    await individualRepository.transferI2F(sourceId, destinationId, amount);
    const { source, destination } = await validateTransferI2F(sourceId, destinationId, amount);
    const result: ITransferResult = {
      sourceAccount: {
        id: source.individual_account_id,
        balance: source.balance - amount,
        currency: source.currency,
      },
      destinationAccount: {
        id: destination.family_account_id,
        balance: destination.balance + amount,
        currency: destination.currency,
      },
    };
    return result;      
  }
}
const instance = new IndividualAccountService();
export default instance;
