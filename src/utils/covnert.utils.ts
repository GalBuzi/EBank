import { IGenericDTO } from '../types/dto.types.js';
import { RowDataAccountAll } from '../types/rowData.types.js';
import { myMap } from '../utils/format.utils.js';

class Convert {
  
  convertRowsDataToDTO(data: RowDataAccountAll[], formatter: string): IGenericDTO[] {
    const func = myMap[formatter];
    const accounts: IGenericDTO[] = [];
    for (const element of data) {
      let formatted;
      formatted = func(element);
      accounts.push(formatted);
    }
    return accounts;
  }
}
const instance = new Convert();
export default instance;

export enum FormatterMapper {
  formatToIndividualDTO = 'formatToIndividualDTO',
  formatToBusinessDTO = 'formatToBusinessDTO',
  formatDataToFamilyDTO = 'formatDataToFamilyDTO',
}
