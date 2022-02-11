import { IGenericDTO } from '../types/dto.types.js';
import { RowDataAccountAll } from '../types/rowData.types.js';
import { myMap } from '../utils/format.utils.js';
export function convertRowsDataToDTO(data: RowDataAccountAll[], formatter: string): IGenericDTO[] {
  const func = myMap[formatter];
  const accounts : IGenericDTO[] = [];
  for (const element of data) { 
    let formatted;
    formatted = func(element);
    accounts.push(formatted);
  }
  return accounts;
}
export enum FormatterMapper {
  formatToIndividualDTO = 'formatToIndividualDTO',
  formatToBusinessDTO = 'formatToBusinessDTO',
  formatDataToFamilyDTO = 'formatDataToFamilyDTO',
}