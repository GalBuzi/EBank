import * as individualRepository from '../repositories/SQLRepository/individual.repository.js';
import { IAccountDTO, IIndividualAccountDTO } from '../types/dto_models.types.js';
import { IAccount, IIndividualAccount } from '../types/models.types.js';

export async function createIndividualAcc(payload : IIndividualAccount) : Promise<string> {
    // first create the account
    // extreact all fields related to account
    //create individual account
    // extract all feilds related to individual
    //return result
    //const account = await individualRepository.createIndividualAccount()
    
    return 'hi';
}