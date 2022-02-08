import { IBusinessAccountDTO } from '../types/dto_models.types.js';
import { IBusinessAccountModel } from '../types/models.types.js';
import { extractDataFromBusinessModel } from '../types/extractor.types.js';
import * as accountRepository from '../repositories/SQLRepository/account.repository.js';
import * as addressRepository from '../repositories/SQLRepository/address.repository.js';
import * as businessRepository from '../repositories/SQLRepository/business.repository.js';
import * as builder from '../types/builder.types.js';
import { RowDataBusiness } from '../types/builder.types.js';

class BusinessAccountService implements builder.Converter{

  async createBusinessAccount(business_model : IBusinessAccountModel):Promise<IBusinessAccountDTO>{
    const { accountToInsert, addressToInsert, businessToInsert } = 
    extractDataFromBusinessModel(business_model);
    const createdAccount = await accountRepository.createAccount(accountToInsert);
    const createdAddress = await addressRepository.createAddress(addressToInsert); 
    businessToInsert.account_id = createdAccount.account_id;
    businessToInsert.address_id = createdAddress.address_id;
    const businessAccountCreated = await businessRepository.createBusinessAccount(businessToInsert);
    const businessDTOArr = this.convertRowsDataToDTO([businessAccountCreated]) as IBusinessAccountDTO[];
    return businessDTOArr[0];
  }
    
  async getBusinessAccountById(business_id : number) : Promise<IBusinessAccountDTO> {
    const businessObject = await businessRepository.getBusinessAccountById(business_id);
    const businessDTOArr = this.convertRowsDataToDTO([businessObject])  as IBusinessAccountDTO[];
    return businessDTOArr[0];
  }
    
  async getAllBusinessAccount() : Promise<IBusinessAccountDTO[]> {
    const businessObject = await businessRepository.getAllBusinessAccount();
    const businessDTOArr : IBusinessAccountDTO[] = this.convertRowsDataToDTO(businessObject) as IBusinessAccountDTO[];
    return businessDTOArr;
  }

  convertRowsDataToDTO(data: RowDataBusiness[]): IBusinessAccountDTO[] {
    const accounts : IBusinessAccountDTO[] = [];
    for (const element of data) { 
      let formatted;
      formatted = this.formatToBusinessDTO(element as RowDataBusiness);
      accounts.push(formatted);
    }
    return accounts as IBusinessAccountDTO[];
  }

  formatToBusinessDTO(element : RowDataBusiness) : IBusinessAccountDTO { 
    const account : IBusinessAccountDTO = {
      business_account_id : element.business_account_id,
      address_id : element.address_id,
      account_id : element.account_id,
      company_id : element.company_id,
      company_name : element.company_name,
      context : element.context,
      currency : element.currency,
      balance : element.balance,
      status_id : element.status_id,
      type_name : element.type_name,
      address : {
        street_name : element.street_name,
        street_number : element.street_number,
        postal_code : element.postal_code,
        country_code : element.country_code,
        country_name : element.country_name,
        city : element.city,
        region : element.region,
      },
    };
    return account;
  }
}

const instance = new BusinessAccountService();

export default instance;