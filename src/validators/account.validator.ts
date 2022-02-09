import { IAccountModel, IAddressModel } from '../types/models.types.js';

class AccountValidator {
  isActiveAccounts(accounts : IAccountModel[]){

  }

  isAccountSameType(accounts : IAccountModel[], type: string){

  }

  isSameCurrency(accounts : IAccountModel[], currency:string){

  }

  isAllowedToTransfer(account:IAddressModel, toTransfer : number,
    needToRemainInAccountAfterTransfer:number){

  }

  isAcoountsHasSameOwningCompany(accounts: IAddressModel[], company_name:string){

  }
}

const instance = new AccountValidator();
export default instance;