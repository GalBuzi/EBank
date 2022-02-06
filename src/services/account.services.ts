import { IAccount, IIndividualAccount, IIndividualAccountUpdate } from '../types/models.types.js';
import * as AccountRepositorySQL from '../repositories/SQLRepository/account.repository.js';
import { IAccountDTO } from '../types/dto_models.types.js';

export async function createAccount(payload : IAccount) : Promise<IAccountDTO> {
  return await AccountRepositorySQL.createAccount(payload);
}

