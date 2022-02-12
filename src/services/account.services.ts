import { IAccountModel, IChangeStatus, IChangeStatusResponse } from '../types/models.types.js';
import * as accountRepositorySQL from '../repositories/SQLRepository/account.repository.js';
import { IAccountDTO } from '../types/dto.types.js';
import builderSQL from '../utils/builder.utils.js';
// export async function createAccount(payload: IAccountModel): Promise<IAccountDTO> {
//   return await accountRepositorySQL.createAccount(payload);
// }

export async function activateDeactivateAccounts(payload : IChangeStatus) :Promise<IChangeStatusResponse> {
    // CHECK IF NO ONE IS FAMILY
    const result = await builderSQL.activateDeactivateAccounts(payload);
    return result;
}
