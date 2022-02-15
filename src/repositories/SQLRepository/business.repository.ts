import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { IBusinessAccountRecord } from '../../types/records.type.js';
import { db } from '../../utils/initializer.utils.js';
import { RowDataBusiness } from '../../types/rowData.types.js';
import { IBusinessAccountDTO, IIndividualAccountDTO } from '../../types/dto.types.js';
import accountRepository from './account.repository.js';

class BusinessRepository {
  async getBusinessAccountById(id: number): Promise<RowDataBusiness> {
    const [business] = (await db.query(
      `SELECT * FROM business_account ba JOIN account a ON ba.account_id = a.account_id
      JOIN address ad ON ad.address_id = ba.address_id
      JOIN status s ON s.status_id = a.status_id 
      WHERE business_account_id = ${id}`,
    )) as RowDataPacket[];
    return business[0] as RowDataBusiness;
  }

  async getListOfBusinessesAccountsById(individualsId: number[]): Promise<RowDataBusiness[]> {
    const str = individualsId.join(',');
    const [individuals] = (await db.query(
      `SELECT * FROM business_account ba JOIN account a ON ba.account_id = a.account_id 
      JOIN address ad ON ba.address_id = ad.address_id 
      JOIN status s ON s.status_id = a.status_id
      WHERE ba.business_account_id IN (${str})`,
    )) as RowDataPacket[];
    return individuals as RowDataBusiness[];
  }

  async createBusinessAccount(payload: IBusinessAccountRecord): Promise<RowDataBusiness> {
    const [business] = (await db.query(
      'INSERT INTO business_account SET ?',
      payload,
    )) as ResultSetHeader[];
    const businessCreated = await this.getBusinessAccountById(business.insertId);
    return businessCreated;
  }

  async transferB2B(
    sourceAccount: IBusinessAccountDTO,
    destinationAccount: IBusinessAccountDTO,
    amount: number,
    toDeposit: number,
  ): Promise<void> {
    await db.beginTransaction();
    try {
      await accountRepository.subtractAmountFromAccountBalance(sourceAccount.account_id, amount);
      await accountRepository.addAmountToAccountBalance(destinationAccount.account_id, toDeposit);
      await db.commit();
    } catch (err) {
      await db.rollback();
      throw err;
    }
  }

  async transferB2I(
    sourceAccount: IBusinessAccountDTO,
    destinationAccount: IIndividualAccountDTO,
    amount: number,
  ): Promise<void> {
    await db.beginTransaction();
    try {
      await accountRepository.subtractAmountFromAccountBalance(sourceAccount.account_id, amount);
      await accountRepository.addAmountToAccountBalance(destinationAccount.account_id, amount);
      await db.commit();
    } catch (err) {
      await db.rollback();
      throw err;
    }
  }
}

const businessRepository = new BusinessRepository();
export default businessRepository;
