import { IBusinessAccountDTO } from '../types/dto_models.types.js';
import { IBusinessAccountModel, ITransferResult } from '../types/models.types.js';
import { extractDataFromBusinessModel } from '../types/extractor.types.js';
import * as accountRepository from '../repositories/SQLRepository/account.repository.js';
import * as addressRepository from '../repositories/SQLRepository/address.repository.js';
import * as businessRepository from '../repositories/SQLRepository/business.repository.js';
import * as builder from '../types/builder.types.js';
import { RowDataBusiness } from '../types/builder.types.js';
import { validateTransferB2B, validateTransferB2I } from '../utils/validations/transfer.validator.utils.js';
import { ServerException } from '../exceptions/ServerExcpetion.exceptions.js';
import { getRate } from '../utils/helpers.utils.js';

class FamilyAccountService implements builder.ConvertRowDataToDTO{
    
    
  convertRowsDataToDTO(T: builder.RowDataAccount[]): builder.AccountDTO[] {
    throw new Error('Method not implemented.');
  }

  
}

const instance = new FamilyAccountService();
export default instance;