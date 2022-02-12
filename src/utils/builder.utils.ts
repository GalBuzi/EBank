import { IAccountDTO, IBusinessAccountDTO, IFamilyAccountDTO, IIndividualAccountDTO } from '../types/dto.types.js';
import { IAccountModel, IBusinessAccountModel, IChangeStatus, IChangeStatusResponse, IFamilyAccountModel, IIndividualAccountModel, IModifyFamilyAccount } from '../types/models.types.js';
import * as accountRepository from '../repositories/SQLRepository/account.repository.js';
import * as individualRepository from '../repositories/SQLRepository/individual.repository.js';
import * as addressRepository from '../repositories/SQLRepository/address.repository.js';
import * as businessRepository from '../repositories/SQLRepository/business.repository.js';
import * as familyRepository from '../repositories/SQLRepository/family.repository.js';
import * as EXTRACTOR from '../utils/extraction.utils.js';
import * as CONVERTER from '../utils/covnert.utils.js';
import { ServerException } from '../exceptions/ServerExcpetion.exceptions.js';
import { RowDataFamily, RowDataIndividual } from '../types/rowData.types.js';
import { IAccountRecord } from '../types/records.type.js';
import {actionToStatusId} from '../utils/helpers.utils.js';
interface Builder {
  createAccount : (model : IAccountModel) => Promise<IAccountDTO>;
  createFamilyAccount : (model : IFamilyAccountModel) => Promise<IFamilyAccountDTO>;
  getFamilyAccountById : (id : number, display : string) => Promise<IFamilyAccountDTO>;
  createIndividualAccount : (model : IIndividualAccountModel) => Promise<IIndividualAccountDTO>;
  getIndividualAccountById : (id : number) => Promise<IIndividualAccountDTO>;
  getListOfIndividualsAccountsById : (ids : number[]) => Promise<IIndividualAccountDTO[]>;
  createBusinessAccount : (model: IBusinessAccountModel) => Promise<IBusinessAccountDTO>;
  getBusinessAccountById : (id: number) => Promise<IBusinessAccountDTO>;
}

class BuilderSQL implements Builder {

  async createAccount(recrod : IAccountRecord) : Promise<IAccountDTO> {
    const createdAccount = await accountRepository.createAccount(recrod);
    return createdAccount;
  }
  
  async createFamilyAccount(model: IFamilyAccountModel) : Promise<IFamilyAccountDTO>{
    const accountToInsert = EXTRACTOR.extractAccountRecord(model);
    const createdAccount = await this.createAccount(accountToInsert);
    const familyToInsert = EXTRACTOR.extractFamilyRecord(model);
    const ownersToInsert = EXTRACTOR.extractOwnersIds(model);

    familyToInsert.account_id = createdAccount.account_id;
    const createdFamilyAccount = await familyRepository.createFamilyAccount(familyToInsert);
    await familyRepository.createOwners(ownersToInsert, createdFamilyAccount.family_account_id);
    const familyDTOArr = CONVERTER.convertRowsDataToDTO([createdFamilyAccount], CONVERTER.FormatterMapper.formatDataToFamilyDTO) as IFamilyAccountDTO[];
    familyDTOArr[0].owners = ownersToInsert;
    return familyDTOArr[0];
  }

  async getFamilyAccountById(id: number,  display : string) : Promise<IFamilyAccountDTO> {
    let ownersFull : IIndividualAccountDTO[] = [];
    let ownersShort : number[] = [];
    let  familyDetailsArrWithOwners : IFamilyAccountDTO;
    let rowData : RowDataIndividual[] = [];
    const familyRowsArray : RowDataFamily[] = await familyRepository.getFamilyAccountById(id);
    let arrIDS = familyRowsArray.map((row)=>{
      return row.indiv_account_id ? row.indiv_account_id : 0;
    });
    arrIDS = arrIDS.filter((element)=> element !== 0);
    if (arrIDS.length > 0) {
      rowData = await individualRepository.getListOfIndividualsAccountsById(arrIDS); 
    }
    const familyDetailsArr = CONVERTER.convertRowsDataToDTO([familyRowsArray[0]], CONVERTER.FormatterMapper.formatDataToFamilyDTO) as IFamilyAccountDTO[]; 
    switch (display){
      case 'full':
        ownersFull = CONVERTER.convertRowsDataToDTO(rowData, CONVERTER.FormatterMapper.formatToIndividualDTO) as IIndividualAccountDTO[];
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

  async createIndividualAccount(model: IIndividualAccountModel) : Promise<IIndividualAccountDTO>{
    const accountToInsert = EXTRACTOR.extractAccountRecord(model);
    const addressToInsert = EXTRACTOR.extractAddressRecord(model);
    const individualToInsert = EXTRACTOR.extractIndividualRecord(model);
    const createdAccount = await this.createAccount(accountToInsert);
    const cretedAddress = await addressRepository.createAddress(addressToInsert);
    individualToInsert.account_id = createdAccount.account_id;
    individualToInsert.address_id = cretedAddress.address_id;
    const individualAccount = await individualRepository.createIndividualAccount(individualToInsert);
    const individualDTOArr = CONVERTER.convertRowsDataToDTO([individualAccount], CONVERTER.FormatterMapper.formatToIndividualDTO) as IIndividualAccountDTO[];
    return individualDTOArr[0];
  }

  async getIndividualAccountById(id: number) : Promise<IIndividualAccountDTO> {
    const individualAccount = await individualRepository.getIndividualAccountById(id);
    if (!individualAccount) throw new ServerException(`Individual account with id ${id} not found`);
    const formattedAccount = CONVERTER.convertRowsDataToDTO([individualAccount], CONVERTER.FormatterMapper.formatToIndividualDTO) as IIndividualAccountDTO[];
    return formattedAccount[0];
  }

  async getListOfIndividualsAccountsById(ids : number[]) : Promise<IIndividualAccountDTO[]>{
    const individualAccounts = await individualRepository.getListOfIndividualsAccountsById(ids);
    if (!individualAccounts) throw new ServerException('One of the individuals doesn\'t exist!');
    const formattedAccount = CONVERTER.convertRowsDataToDTO(individualAccounts, CONVERTER.FormatterMapper.formatToIndividualDTO) as IIndividualAccountDTO[];
    return formattedAccount;
  }

  async createBusinessAccount(model: IBusinessAccountModel) : Promise<IBusinessAccountDTO>{
    const accountToInsert = EXTRACTOR.extractAccountRecord(model);
    const createdAccount = await this.createAccount(accountToInsert);
    const addressToInsert = EXTRACTOR.extractAddressRecord(model);
    const businessToInsert = EXTRACTOR.extractBusinessRecord(model);
    const createdAddress = await addressRepository.createAddress(addressToInsert);
    businessToInsert.account_id = createdAccount.account_id;
    businessToInsert.address_id = createdAddress.address_id;
    const businessAccountCreated = await businessRepository.createBusinessAccount(businessToInsert);
    const businessDTOArr = CONVERTER.convertRowsDataToDTO([businessAccountCreated], CONVERTER.FormatterMapper.formatToBusinessDTO) as IBusinessAccountDTO[];
    return businessDTOArr[0];
  }

  async getBusinessAccountById(id: number) : Promise<IBusinessAccountDTO> {
    const businessObject = await businessRepository.getBusinessAccountById(id);
    if (!businessObject) throw new ServerException(`Business with id ${id} doesn't exists!`);
    const businessDTOArr = CONVERTER.convertRowsDataToDTO([businessObject], CONVERTER.FormatterMapper.formatToBusinessDTO) as IBusinessAccountDTO[];
    return businessDTOArr[0];
  }

  async activateDeactivateAccounts(model : IChangeStatus) : Promise<IChangeStatusResponse> {
    const status_id = actionToStatusId[model.action];
    await accountRepository.activateDeactivateAccounts(model.ids,status_id);
    const result : IChangeStatusResponse = {
      ids : model.ids,
      status:model.action
    };
    return result;
  }
  
  async removeIndividualFromFamilyAccount(family_accout_id : number,model : IModifyFamilyAccount, display : string) : Promise<IFamilyAccountDTO> {
    const ids = model.individuals.map((individual)=>{return individual[0]}).join(',');
    await familyRepository.removeIndividualFromFamilyAccount(family_accout_id,ids);
    const familyDTO = await this.getFamilyAccountById(family_accout_id,display);
    return familyDTO;
  }

  async addIndividualsToFamilyAccount(family_accout_id : number,model : IModifyFamilyAccount, display : string) : Promise<IFamilyAccountDTO> {
    const ids = model.individuals.map((individual)=>{return individual[0]});
    await familyRepository.addIndividualsToFamilyAccount(family_accout_id,ids);
    const familyDTO = await this.getFamilyAccountById(family_accout_id,display);
    return familyDTO;
  }

}

const instance = new BuilderSQL();
export default instance;