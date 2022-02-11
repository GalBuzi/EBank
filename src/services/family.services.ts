import {IIndividualAccountDTO,IFamilyAccountDTO,IFamilyAccounBaseDTO } from '../types/dto.types.js';
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

class FamilyAccountService {
    
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
    let ownersFull : IIndividualAccountDTO[] = [];
    let ownersShort : number[] = [];
    let  familyDetailsArrWithOwners : IFamilyAccountDTO;
    const familyRowsArray : RowDataFamily[] = await familyRepository.getFamilyAccountByIdDetailed(id);
    const arrIDS = familyRowsArray.map((row)=>{
      return row.indiv_account_id;
    });
    const familyDetailsArr = this.convertRowsDataToDTO(familyRowsArray) as IFamilyAccounBaseDTO[];
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

  removeIndividualFromFamily(family_account_id : number,){
    
  }
    

  convertRowsDataToDTO(data: RowDataFamily[]): IFamilyAccounBaseDTO[] {
    const accounts : IFamilyAccounBaseDTO[] = [];
    for (const element of data) { 
      let formatted;
      formatted = this.formatRowsDataToFamilyDTO(element);
      accounts.push(formatted);
    }
    return accounts;
  }

  formatRowsDataToFamilyDTO(element : RowDataFamily) : IFamilyAccounBaseDTO{
    const account : IFamilyAccounBaseDTO= {
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