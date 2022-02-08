import { IAccountModel, IAddressModel } from '../types/models.types.js';

class AccountValidator {
  isActiveAccounts(accounts : IAccountModel[]){

  }

  isTypeOf(accounts : IAccountModel[], type: string){

  }

  sameCurrency(accounts : IAccountModel[], currency:string){

  }

  isAllowedToTransfer(account:IAddressModel, toTransfer : number,
    needToRemainInAccountAfterTransfer:number){

  }

  isSameOwningCompany(accounts: IAddressModel[], company_name:string){

  }
}

const instance = new AccountValidator();
export default instance;