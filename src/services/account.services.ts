import { IAccountModel, IIndividualAccountModel } from '../types/models.types.js';
import * as AccountRepositorySQL from '../repositories/SQLRepository/account.repository.js';
import { IAccountDTO } from '../types/dto_models.types.js';

export async function createAccount(payload : IAccountModel) : Promise<IAccountDTO> {
  return AccountRepositorySQL.createAccount(payload);
}

