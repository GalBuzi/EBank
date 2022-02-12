import { IIndividualAccountDTO, IFamilyAccountDTO } from '../types/dto.types.js';
import { IFamilyAccountModel, IModifyFamilyAccount } from '../types/models.types.js';
import * as accountRepository from '../repositories/SQLRepository/account.repository.js';
import individualService from '../services/individual.services.js';
import * as familyRepository from '../repositories/SQLRepository/family.repository.js';
import { RowDataFamily } from '../types/rowData.types.js';
import * as EXTRACTOR from '../utils/extraction.utils.js';
import * as CONVERTER from '../utils/covnert.utils.js';
import builderSQL from '../utils/builder.utils.js';
import { ITransferResult } from '../types/transfers.type.js';


class FamilyAccountService {
    
  async createFamilyAcc(
    family_model: IFamilyAccountModel,
  ): Promise<IFamilyAccountDTO> {
    const dtoFamily = await builderSQL.createFamilyAccount(family_model);
    return dtoFamily;
  }

  async getFamilyAccountById(id: number, display : string) : Promise<IFamilyAccountDTO> {
    const dtoFamily = await builderSQL.getFamilyAccountById(id, display);
    return dtoFamily;
  }

  async removeIndividualFromFamilyAccount(family_accout_id : number, model : IModifyFamilyAccount, display: string) : Promise<IFamilyAccountDTO>{
    const dtoFamily = await builderSQL.removeIndividualFromFamilyAccount(family_accout_id, model, display);
    return dtoFamily;
  }

  async addIndividualsToFamilyAccount(family_accout_id : number, model : IModifyFamilyAccount, display: string) : Promise<IFamilyAccountDTO> {
    const dtoFamily = await builderSQL.addIndividualsToFamilyAccount(family_accout_id, model, display);
    return dtoFamily;
  }

  async closeFamilyAccount(id : number) : Promise<void> {
    await familyRepository.closeFamilyAccount(id);

  }

  async transferF2B(sourceId: number, destinationId: number, amount: number) : Promise<void> {
    // await familyRepository.transferF2B(sourceId, destinationId, amount);
    // CHANGE TO validateTransferF2B
    // const { source, destination } = await validateTransferB2BFX(sourceId, destinationId, amount);  
    // const result: ITransferResult = {
    //   sourceAccount: {
    //     id: source.business_account_id,
    //     balance: source.balance - amount,
    //     currency: source.currency,
    //   },
    //   destinationAccount: {
    //     id: destination.business_account_id,
    //     balance: destination.balance + toDeposit,
    //     currency: destination.currency,
    //   },
    // };
    // return result;
      
  }
  
}

const instance = new FamilyAccountService();
export default instance;