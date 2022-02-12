import { IIndividualAccountModel } from '../types/models.types.js';
import { IIndividualAccountDTO } from '../types/dto.types.js';
import builderSQL from '../utils/builder.utils.js';
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
}
const instance = new IndividualAccountService();
export default instance;
