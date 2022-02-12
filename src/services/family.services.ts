import { IIndividualAccountDTO, IFamilyAccountDTO } from '../types/dto.types.js';
import { IFamilyAccountModel } from '../types/models.types.js';
import * as accountRepository from '../repositories/SQLRepository/account.repository.js';
import individualService from '../services/individual.services.js';
import * as familyRepository from '../repositories/SQLRepository/family.repository.js';
import { RowDataFamily } from '../types/rowData.types.js';
import * as EXTRACTOR from '../utils/extraction.utils.js';
import * as CONVERTER from '../utils/covnert.utils.js';
import builderSQL from '../utils/builder.utils.js';
import { validateFamilyAccountCreationOwners } from '../utils/validations/transfer.validator.utils.js';
import { ValidationException } from '../exceptions/ValidationException.excpetions.js';


class FamilyAccountService {
    
  async createFamilyAcc(
    family_model: IFamilyAccountModel,
  ): Promise<IFamilyAccountDTO> {
    const filteredFamilyModel = await validateFamilyAccountCreationOwners(family_model);   
    if (filteredFamilyModel.owners.length === 0){
      throw new ValidationException('no valid owners were found to open family account');
    } 
    const dtoFamily = await builderSQL.createFamilyAccount(filteredFamilyModel);
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