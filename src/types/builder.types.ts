import { IIndividualAccountDTO } from './dto_models.types';

export interface RowPacketInfo {
  [key : string] : any
}
export function buildIndividualAccountsFromDB(individualAccDto : RowPacketInfo[]) : IIndividualAccountDTO[] {
  const accounts : IIndividualAccountDTO[] = [];
  for (const element of individualAccDto) {
    const account : IIndividualAccountDTO = {
      individual_account_id : element.individual_account_id,
      address_id : element.address_id,
      account_id : element.account_id,
      individual_id : element.individual_id,
      first_name : element.first_name,
      last_name : element.last_name,
      email : element.email,
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
    accounts.push(account);
  }
  return accounts as IIndividualAccountDTO[];
}