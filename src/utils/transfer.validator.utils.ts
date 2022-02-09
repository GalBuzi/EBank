import { getBusinessAccountById } from '../repositories/SQLRepository/business.repository.js';
import { getIndividualAccountById } from '../repositories/SQLRepository/individual.repository.js';
import { RowDataBusiness, RowDataIndividual } from '../types/builder.types.js';

import * as VALIDATOR from './validator.logic.utils.js';

export async function validateTransferB2B(
  sourceId: number,
  destinationId: number,
  amount: number,
  flag?: string,
): Promise<{ source: RowDataBusiness; destination: RowDataBusiness }> {
  const source = await getBusinessAccountById(sourceId);
  const destination = await getBusinessAccountById(destinationId);
  VALIDATOR.isActiveAccounts(source.status_id, destination.status_id);
  VALIDATOR.isValidTypesB2B(source.type_name, destination.type_name);
  if (flag === 'fx') {
    VALIDATOR.isDifferentCurrency(source.currency, destination.currency);
  } else {
    VALIDATOR.isSameCurrency(source.currency, destination.currency);
  }

  VALIDATOR.isValidBalanceB2B(source.balance, amount);
  VALIDATOR.isLimitValidB2B(source.company_id, destination.company_id, amount);
  return { source, destination };
}

export async function validateTransferB2I(
  sourceId: number,
  destinationId: number,
  amount: number,
): Promise<{ source: RowDataBusiness; destination: RowDataIndividual }> {
  const source = await getBusinessAccountById(sourceId);
  const destination = await getIndividualAccountById(destinationId);
  VALIDATOR.isActiveAccounts(source.status_id, destination.status_id);
  VALIDATOR.isValidTypesB2I(source.type_name, destination.type_name);
  VALIDATOR.isSameCurrency(source.currency, destination.currency);
  VALIDATOR.isValidBalanceB2I(source.balance, destination.balance);
  VALIDATOR.isLimitValidB2I(amount);
  return { source, destination };
}
