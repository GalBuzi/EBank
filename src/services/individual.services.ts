import { IIndividualAccountModel } from '../types/models.types.js';
import * as accountRepository from '../repositories/SQLRepository/account.repository.js';
import * as individualRepository from '../repositories/SQLRepository/individual.repository.js';
import * as addressRepository from '../repositories/SQLRepository/address.repository.js';
import { IIndividualAccountDTO } from '../types/dto.types.js';
import { ServerException } from '../exceptions/ServerExcpetion.exceptions.js';
import * as EXTRACTOR from '../utils/extraction.utils.js';
import * as CONVERTER from '../utils/covnert.utils.js';
class IndividualAccountService {

  async createIndividualAcc(
    payload: IIndividualAccountModel,
  ): Promise<IIndividualAccountDTO> {
    const accountToInsert = EXTRACTOR.extractAccountRecord(payload);
    const addressToInsert = EXTRACTOR.extractAddressRecord(payload);
    const individualToInsert = EXTRACTOR.extractIndividualRecord(payload);
    const createdAccount = await accountRepository.createAccount(accountToInsert);
    const cretedAddress = await addressRepository.createAddress(addressToInsert);
    individualToInsert.account_id = createdAccount.account_id;
    individualToInsert.address_id = cretedAddress.address_id;
    const individualAccount = await individualRepository.createIndividualAccount(individualToInsert);
    const individualDTOArr = CONVERTER.convertRowsDataToDTO([individualAccount], CONVERTER.FormatterMapper.formatToIndividualDTO) as IIndividualAccountDTO[];
    return individualDTOArr[0];
  }
  
  async getListOfIndividualsById(individualsId: number[]): Promise<IIndividualAccountDTO[]> {
    const individualAccounts = await individualRepository.getListOfIndividualsAccountsById(individualsId);
    if (!individualAccounts) throw new ServerException('One of the individuals doesn\'t exist!');
    const formattedAccount = CONVERTER.convertRowsDataToDTO(individualAccounts, CONVERTER.FormatterMapper.formatToIndividualDTO) as IIndividualAccountDTO[];
    return formattedAccount;
  }

  async getIndividualById(id: number): Promise<IIndividualAccountDTO> {
    const individualAccount = await individualRepository.getIndividualAccountById(id);
    if (!individualAccount) throw new ServerException(`Individual account with id ${id} not found`);
    const formattedAccount = CONVERTER.convertRowsDataToDTO([individualAccount], CONVERTER.FormatterMapper.formatToIndividualDTO) as IIndividualAccountDTO[];
    return formattedAccount[0];
  }
}
const instance = new IndividualAccountService();
export default instance;
