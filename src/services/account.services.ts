import { IChangeStatus, IChangeStatusAccounts, IChangeStatusResponse } from '../types/models.types.js';

import builderSQL from '../utils/builder.utils.js';
import { validateActivateDeactivateAccounts } from '../utils/validations/services.validator.utils.js';

export async function activateDeactivateAccounts(payload : IChangeStatus) :Promise<IChangeStatusResponse> {
  const validationRes : IChangeStatusAccounts = await validateActivateDeactivateAccounts(payload);
  const result = await builderSQL.activateDeactivateAccounts(validationRes);
  return result;
}
