import { IIndividualAccountDTO, IFamilyAccountDTO } from '../types/dto.types.js';
import { IFamilyAccountModel } from '../types/models.types.js';
import * as accountRepository from '../repositories/SQLRepository/account.repository.js';
import individualService from '../services/individual.services.js';
import * as familyRepository from '../repositories/SQLRepository/family.repository.js';
import { RowDataFamily } from '../types/rowData.types.js';
import * as EXTRACTOR from '../utils/extraction.utils.js';
import * as CONVERTER from '../utils/covnert.utils.js';

class FamilyAccountService {
    
  async createFamilyAcc(
    family_model: IFamilyAccountModel,
  ): Promise<IFamilyAccountDTO> {
    const accountToInsert = EXTRACTOR.extractAccountRecord(family_model);
    const familyToInsert = EXTRACTOR.extractFamilyRecord(family_model);
    const ownersToInsert = EXTRACTOR.extractOwnersIds(family_model);
    const createdAccount = await accountRepository.createAccount(accountToInsert);
    familyToInsert.account_id = createdAccount.account_id;
    const createdFamilyAccount = await familyRepository.createFamilyAccount(familyToInsert);
    await familyRepository.createOwners(ownersToInsert, createdFamilyAccount.family_account_id);
    const familyDTOArr = CONVERTER.convertRowsDataToDTO([createdFamilyAccount], CONVERTER.FormatterMapper.formatDataToFamilyDTO) as IFamilyAccountDTO[];
    familyDTOArr[0].owners = ownersToInsert;
    return familyDTOArr[0];
  }

  async getFamilyAccountById(id: number, display : string) : Promise<IFamilyAccountDTO> {
    let ownersFull : IIndividualAccountDTO[] = [];
    let ownersShort : number[] = [];
    let  familyDetailsArrWithOwners : IFamilyAccountDTO;
    const familyRowsArray : RowDataFamily[] = await familyRepository.getFamilyAccountByIdDetailed(id);
    const arrIDS = familyRowsArray.map((row)=>{
      return row.indiv_account_id;
    });
    const familyDetailsArr = CONVERTER.convertRowsDataToDTO([familyRowsArray[0]], CONVERTER.FormatterMapper.formatDataToFamilyDTO) as IFamilyAccountDTO[]; 
    switch (display){
      case 'full':
        ownersFull = await individualService.getListOfIndividualsById(arrIDS);
        familyDetailsArrWithOwners = { ...familyDetailsArr[0], owners:ownersFull };
        break;
      case 'partial':
        ownersShort = arrIDS;
        familyDetailsArrWithOwners = { ...familyDetailsArr[0], owners:ownersShort };
        break;
      default:
        ownersShort = arrIDS;
        familyDetailsArrWithOwners = { ...familyDetailsArr[0], owners:ownersShort };
        break;
    }
    return familyDetailsArrWithOwners;
  }

  removeIndividualFromFamily(family_account_id : number){
    
  }
  
}

const instance = new FamilyAccountService();
export default instance;