import { IAccountDTO, IBusinessAccountDTO, IFamilyAccountDTO, IIdempotancyRecord, IIndividualAccountDTO, ISecretKey } from '../types/dto.types.js';
import { IAccountModel, IBusinessAccountModel, IChangeStatusAccounts, IChangeStatusResponse, IFamilyAccountModel, IIndividualAccountModel, IModifyFamilyAccount } from '../types/models.types.js';
import accountRepository from '../repositories/SQLRepository/account.repository.js';
import individualRepository from '../repositories/SQLRepository/individual.repository.js';
import addressRepository from '../repositories/SQLRepository/address.repository.js';
import businessRepository from '../repositories/SQLRepository/business.repository.js';
import familyRepository from '../repositories/SQLRepository/family.repository.js';
import EXTRACTOR from '../utils/extraction.utils.js';
import CONVERTER from '../utils/covnert.utils.js';
import { ServerException } from '../exceptions/ServerExcpetion.exceptions.js';
import { actionToStatusId, actionToStatusName } from '../utils/helpers.utils.js';
import * as generalRepository from '../repositories/SQLRepository/general.repository.js';
import { IAccountRecord } from '../types/records.type.js';
import { RowDataFamily, RowDataIndividual } from '../types/rowData.types.js';
import { FormatterMapper } from '../utils/covnert.utils.js';
import { ValidationException } from '../exceptions/ValidationException.excpetions.js';
interface Builder {
  createAccount : (model : IAccountModel) => Promise<IAccountDTO>;
  createFamilyAccount : (model : IFamilyAccountModel) => Promise<IFamilyAccountDTO>;
  getFamilyAccountById : (id : number, display : string) => Promise<IFamilyAccountDTO>;
  createIndividualAccount : (model : IIndividualAccountModel) => Promise<IIndividualAccountDTO>;
  getIndividualAccountById : (id : number) => Promise<IIndividualAccountDTO>;
  getListOfIndividualsAccountsById : (ids : number[]) => Promise<IIndividualAccountDTO[]>;
  createBusinessAccount : (model: IBusinessAccountModel) => Promise<IBusinessAccountDTO>;
  getBusinessAccountById : (id: number) => Promise<IBusinessAccountDTO>;
  getSecretByAccessKey : (accesskey : string) => Promise<string>;
  getListOfBusinessesAccountsById: (ids : number[]) => Promise<IBusinessAccountDTO[]>
}

class BuilderSQL implements Builder {

  async getResponseByIdemKeyAccessKey(access: string, idem : string) : Promise<IIdempotancyRecord[]>{
    const idempotancyData = await generalRepository.getResponseByIdemKeyAccessKey(access, idem);   
    return idempotancyData;
  }

  async insertResponseToDB(access: string, idem : string, responseToUser: string, allParams : string) : Promise<string>{    
    console.log('insertResponseToDB');
    await generalRepository.insertResponseToDB(access, idem, responseToUser, allParams);
    return 'success';
  }

  
  async getSecretByAccessKey(accessKey : string) : Promise<string> {
    const rowSecretKey = await generalRepository.getSecertKey(accessKey);
    const secretKey = (rowSecretKey[0] as ISecretKey).secret_key;
    return secretKey;
  }

  async createAccount(recrod : IAccountRecord) : Promise<IAccountDTO> {
    const createdAccount = await accountRepository.createAccount(recrod);
    return createdAccount;
  }
  
  async createFamilyAccount(model: IFamilyAccountModel) : Promise<IFamilyAccountDTO>{
    const accountToInsert = EXTRACTOR.extractAccountRecord(model);
    const familyToInsert = EXTRACTOR.extractFamilyRecord(model);
    const ownersToInsert = EXTRACTOR.extractOwnersIds(model);
    accountToInsert.balance = ownersToInsert.sum;
    const createdAccount = await this.createAccount(accountToInsert);
    familyToInsert.account_id = createdAccount.account_id;
    const createdFamilyAccount = await familyRepository.createFamilyAccount(familyToInsert);
    console.log(createdFamilyAccount);
    const tuples = model.owners.sort((a, b) => a[0] - b[0]);
    const ids = tuples.map(o => o[0]);
    const amounts = tuples.map(o => o[1]);
    const individualsDTOs = await individualRepository.getListOfIndividualsAccountsById(ownersToInsert.ids);
    await familyRepository.createOwners(individualsDTOs, ids, amounts, createdFamilyAccount.family_account_id);
    const familyDTOArr = CONVERTER.convertRowsDataToDTO([createdFamilyAccount], FormatterMapper.formatDataToFamilyDTO) as IFamilyAccountDTO[];
    familyDTOArr[0].owners = ownersToInsert.ids;
    return familyDTOArr[0];
  }

  async getFamilyAccountById(id: number,  display : string) : Promise<IFamilyAccountDTO> {
    let ownersFull : IIndividualAccountDTO[] = [];
    let ownersShort : number[] = [];
    let  familyDetailsArrWithOwners : IFamilyAccountDTO;
    let rowData : RowDataIndividual[] = [];
    const familyRowsArray : RowDataFamily[] = await familyRepository.getFamilyAccountById(id);
    if (familyRowsArray.length === 0) throw new ServerException(`Family with id ${id} not found!`, 500);
    let arrIDS = familyRowsArray.map((row)=>{
      return row.indiv_account_id ? row.indiv_account_id : 0;
    });
    arrIDS = arrIDS.filter((element)=> element !== 0);
    if (arrIDS.length > 0) {
      rowData = await individualRepository.getListOfIndividualsAccountsById(arrIDS); 
    }
    const familyDetailsArr = CONVERTER.convertRowsDataToDTO([familyRowsArray[0]], FormatterMapper.formatDataToFamilyDTO) as IFamilyAccountDTO[]; 
    switch (display){
      case 'full':
        ownersFull = CONVERTER.convertRowsDataToDTO(rowData, FormatterMapper.formatToIndividualDTO) as IIndividualAccountDTO[];
        familyDetailsArrWithOwners = { ...familyDetailsArr[0], owners:ownersFull };
        break;
      case 'short':
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
    const individualDTOArr = CONVERTER.convertRowsDataToDTO([individualAccount], FormatterMapper.formatToIndividualDTO) as IIndividualAccountDTO[];
    return individualDTOArr[0];
  }

  async getIndividualAccountById(id: number) : Promise<IIndividualAccountDTO> {
    const individualAccount = await individualRepository.getIndividualAccountById(id);
    if (!individualAccount) throw new ServerException(`Individual account with id ${id} not found`);
    const formattedAccount = CONVERTER.convertRowsDataToDTO([individualAccount], FormatterMapper.formatToIndividualDTO) as IIndividualAccountDTO[];
    return formattedAccount[0];
  }

  async getListOfIndividualsAccountsById(ids : number[]) : Promise<IIndividualAccountDTO[]>{
    if (ids.length === 0) return [];
    const individualAccounts = await individualRepository.getListOfIndividualsAccountsById(ids);
    if (!individualAccounts) throw new ServerException('One of the individuals doesn\'t exist!');
    const formattedAccount = CONVERTER.convertRowsDataToDTO(individualAccounts, FormatterMapper.formatToIndividualDTO) as IIndividualAccountDTO[];
    return formattedAccount;
  }

  async getListOfBusinessesAccountsById(ids : number[]) : Promise<IBusinessAccountDTO[]>{
    if (ids.length === 0) return [];
    const businessAccounts = await businessRepository.getListOfBusinessesAccountsById(ids);    
    if (!businessAccounts) throw new ServerException('One of the businesses doesn\'t exist!');
    const formattedAccount = CONVERTER.convertRowsDataToDTO(businessAccounts, FormatterMapper.formatToBusinessDTO) as IBusinessAccountDTO[];
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
    const businessDTOArr = CONVERTER.convertRowsDataToDTO([businessAccountCreated], FormatterMapper.formatToBusinessDTO) as IBusinessAccountDTO[];
    return businessDTOArr[0];
  }

  async getBusinessAccountById(id: number) : Promise<IBusinessAccountDTO> {
    const businessObject = await businessRepository.getBusinessAccountById(id);
    if (!businessObject) throw new ServerException(`Business with id ${id} doesn't exists!`);
    const businessDTOArr = CONVERTER.convertRowsDataToDTO([businessObject], FormatterMapper.formatToBusinessDTO) as IBusinessAccountDTO[];
    return businessDTOArr[0];
  }

  async activateDeactivateAccounts(model : IChangeStatusAccounts) : Promise<IChangeStatusResponse> {
    const statusId = actionToStatusId[model.action];
    
    const accountsIdsToAction : number[] = [...model.individuals.map(indiv => indiv.account_id),
      ...model.businesses.map(busi => busi.account_id)];

    const accountsThatHaveChanged : number[] = [...model.individuals.map(indiv => indiv.individual_account_id),
      ...model.businesses.map(busi => busi.business_account_id)];
    if (accountsIdsToAction.length === 0) throw new ValidationException('no accounts were found');
    await accountRepository.activateDeactivateAccounts(accountsIdsToAction, statusId);
    const result : IChangeStatusResponse = {
      ids : accountsThatHaveChanged,
      status: actionToStatusName[model.action],
    };
    return result;
  }
  
  async removeIndividualFromFamilyAccount(family_accout_id : number, model : IModifyFamilyAccount, display : string) : Promise<IFamilyAccountDTO> {
    const sorted : number[][] = model.individuals.sort((a, b) => a[0] - b[0] ); //rows return in ascending order from sql
    const ids = sorted.map(o => o[0]);
    const amounts = sorted.map(o => o[1]);
    const sumToSubtractFromFamilyAccount = model.individuals.reduce( (acc, curr) => acc + curr[1], 0);
    await familyRepository.removeIndividualFromFamilyAccount(family_accout_id, ids, amounts, sumToSubtractFromFamilyAccount);
    const familyDTO = await this.getFamilyAccountById(family_accout_id, display);
    return familyDTO;
  }

  async addIndividualsToFamilyAccount(family_accout_id : number, model : IModifyFamilyAccount, display : string) : Promise<IFamilyAccountDTO> {
    const sorted : number[][] = model.individuals.sort((a, b) => a[0] - b[0] ); //rows return in ascending order from sql
    const ids = sorted.map(o => o[0]);
    const amounts = sorted.map(o => o[1]);
    const sumToAddToFamilyAccount = model.individuals.reduce( (acc, curr) => acc + curr[1], 0);
    console.log('ids', ids);
    console.log('amounts', amounts);
    console.log('sumToAddToFamilyAccount', sumToAddToFamilyAccount);

    
    await familyRepository.addIndividualsToFamilyAccount(family_accout_id, ids, amounts, sumToAddToFamilyAccount);
    const familyDTO = await this.getFamilyAccountById(family_accout_id, display);
    return familyDTO;
  }

}

const instance = new BuilderSQL();
export default instance;