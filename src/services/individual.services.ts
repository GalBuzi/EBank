import { IIndividualAccountModel } from '../types/models.types.js';
import * as accountRepository from '../repositories/SQLRepository/account.repository.js';
import * as individualRepository from '../repositories/SQLRepository/individual.repository.js';
import * as addressRepository from '../repositories/SQLRepository/address.repository.js';
import { IIndividualAccountDTO } from '../types/dto.types.js';
import { extractDataFromIndividualModel } from '../types/extractor.types.js';
import * as builder from '../types/builder.types.js';
import { ServerException } from '../exceptions/ServerExcpetion.exceptions.js';
import { RowDataIndividual } from '../types/builder.types.js';

class IndividualAccountService {

  async createIndividualAcc(
    payload: IIndividualAccountModel,
  ): Promise<IIndividualAccountDTO> {
    const { accountToInsert, addressToInsert, individualToInsert } =
      extractDataFromIndividualModel(payload);
    const createdAccount = await accountRepository.createAccount(accountToInsert);
    const cretedAddress = await addressRepository.createAddress(addressToInsert);
    individualToInsert.account_id = createdAccount.account_id;
    individualToInsert.address_id = cretedAddress.address_id;
    const individualAccount = await individualRepository.createIndividualAccount(individualToInsert);
    const individualDTOArr = this.convertRowsDataToDTO([individualAccount]) as IIndividualAccountDTO[];
    return individualDTOArr[0];
  }
  
  // export async function getAllIndividualAcc(): Promise<IIndividualAccountDTO[]> {
  //   const allAccounts = await individualRepository.getAllIndividualsAcc();
  //   const accountsDTOArr = builder.buildDTOArr(allAccounts) as IIndividualAccountDTO[];
  //   return accountsDTOArr;
  // }
  
  async getListOfIndividualsById(individualsId: number[]): Promise<IIndividualAccountDTO[]> {
    const individualAccounts = await individualRepository.getListOfIndividualsAccountsById(individualsId);
    if (!individualAccounts) throw new ServerException('One of the individuals doesn\'t exist!');
    const formattedAccount = this.convertRowsDataToDTO(individualAccounts) as IIndividualAccountDTO[];
    return formattedAccount;
  }

  async getIndividualById(id: number): Promise<IIndividualAccountDTO> {
    const individualAccount = await individualRepository.getIndividualAccountById(id);
    if (!individualAccount) throw new ServerException(`Individual account with id ${id} not found`);
    const formattedAccount = this.convertRowsDataToDTO([individualAccount]) as IIndividualAccountDTO[];
    return formattedAccount[0];
  }
  
  convertRowsDataToDTO(data: RowDataIndividual[]): IIndividualAccountDTO[] {
    const accounts : IIndividualAccountDTO[] = [];
    for (const element of data) { 
      let formatted;
      formatted = this.formatToIndividualDTO(element);
      accounts.push(formatted);
    }
    return accounts;
  }

  formatToIndividualDTO(element: RowDataIndividual): IIndividualAccountDTO {
    const account: IIndividualAccountDTO = {
      individual_account_id: element.individual_account_id,
      individual_id: element.individual_id,
      first_name: element.first_name,
      last_name: element.last_name,
      email: element.email,
      account_id: element.account_id,
      currency: element.currency,
      balance: element.balance,
      status_id: element.status_id,
      type_name: element.type_name,
      address: {
        address_id : element.address_id,
        street_name: element.street_name,
        street_number: element.street_number,
        postal_code: element.postal_code,
        country_code: element.country_code,
        country_name: element.country_name,
        city: element.city,
        region: element.region,
      },
    };
    return account;
  }

}

const instance = new IndividualAccountService();
export default instance;
