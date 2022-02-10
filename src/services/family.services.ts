import { IFamilyAccountDTO, IIndividualAccountDTO } from '../types/dto_models.types.js';
import { IFamilyAccountModel } from '../types/models.types.js';
import { extractDataFromFamilyModel } from '../types/extractor.types.js';
import * as accountRepository from '../repositories/SQLRepository/account.repository.js';
import * as individualRepository from '../repositories/SQLRepository/individual.repository.js';
import individualService from '../services/individual.services.js';
import * as familyRepository from '../repositories/SQLRepository/family.repository.js';
import * as builder from '../types/builder.types.js';
import { ServerException } from '../exceptions/ServerExcpetion.exceptions.js';
import { getRate } from '../utils/helpers.utils.js';
import { RowDataFamily } from '../types/builder.types.js';

class FamilyAccountService implements builder.ConvertRowDataToDTO{
    
  async createFamilyAcc(
    family_model: IFamilyAccountModel,
  ): Promise<IFamilyAccountDTO> {
    const { accountToInsert, familyToInsert, ownersToInsert } =
    extractDataFromFamilyModel(family_model);
    const createdAccount = await accountRepository.createAccount(accountToInsert);
    familyToInsert.account_id = createdAccount.account_id;
    const createdFamilyAccount = await familyRepository.createFamilyAccount(familyToInsert);
    await familyRepository.createOwners(ownersToInsert, createdFamilyAccount.family_account_id);
    const familyDTOArr = this.convertRowsDataToDTO([createdFamilyAccount]) as IFamilyAccountDTO[];
    familyDTOArr[0].owners = ownersToInsert;
    return familyDTOArr[0];
  }

  async getFamilyAccountById(id: number, display : string) : Promise<IFamilyAccountDTO> {
    let ownersFamily : IIndividualAccountDTO[] | number[];
    const familyRowsArray : RowDataFamily[] = await familyRepository.getFamilyAccountByIdDetailed(id);
    const arrIDS = familyRowsArray.map((row)=>{
      return row.indiv_account_id;
    });
    switch (display){
      case 'full':
        ownersFamily = await individualService.getListOfIndividualsById(arrIDS);
        break;
      case 'partial':
        ownersFamily = arrIDS;
        break;
      default:
        ownersFamily = arrIDS;
        break;
    }
    const familyDetailsArr = this.convertRowsDataToDTO(familyRowsArray) as Omit<IFamilyAccountDTO, 'owners'>[];
    const familyDetailsArrWithOwners : IFamilyAccountDTO = { ...familyDetailsArr[0], owners:ownersFamily };
    return familyDetailsArrWithOwners;
  }
    

  convertRowsDataToDTO(data: RowDataFamily[]): Omit<IFamilyAccountDTO, 'owners'>[] {
    const accounts : Omit<IFamilyAccountDTO, 'owners'>[] = [];
    for (const element of data) { 
      let formatted;
      formatted = this.formatRowsDataToFamilyDTO(element);
      accounts.push(formatted);
    }
    return accounts;
  }

  formatRowsDataToFamilyDTO(element : RowDataFamily) : Omit<IFamilyAccountDTO, 'owners'> {
    const account : Omit<IFamilyAccountDTO, 'owners'> = {
      account_id : element.account_id,
      context : element.context,
      currency : element.currency,
      balance : element.balance,
      status_id : element.status_id,
      type_name : element.type_name,
      family_account_id : element.family_account_id,
    };
    return account;
  }
}


const instance = new FamilyAccountService();
export default instance;