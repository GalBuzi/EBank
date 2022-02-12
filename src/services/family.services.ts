import { IIndividualAccountDTO, IFamilyAccountDTO } from '../types/dto.types.js';
import { IFamilyAccountModel } from '../types/models.types.js';
import * as accountRepository from '../repositories/SQLRepository/account.repository.js';
import individualService from '../services/individual.services.js';
import * as familyRepository from '../repositories/SQLRepository/family.repository.js';
import { RowDataFamily } from '../types/rowData.types.js';
import * as EXTRACTOR from '../utils/extraction.utils.js';
import * as CONVERTER from '../utils/covnert.utils.js';
import builderSQL from '../utils/builder.utils.js';


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

  removeIndividualFromFamily(family_account_id : number){
    
  }
  
}

const instance = new FamilyAccountService();
export default instance;