import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { ServerException } from '../../exceptions/ServerExcpetion.exceptions.js';
import { IAccountDTO } from '../../types/dto.types.js';
import { IAccountModel } from '../../types/models.types.js';
import { RowDataAccount } from '../../types/rowData.types.js';
import { db } from '../../utils/initializer.utils.js';

class AccountRepository {
  async getAccountById(id: number): Promise<RowDataAccount> {
    const sql =
      'SELECT * FROM account a JOIN status s ON s.status_id = a.status_id WHERE account_id = ?';
    const results = await db.query(sql, id);
    const result: RowDataPacket[] = results[0] as RowDataPacket[];
    const account = result[0] as IAccountDTO;
    return account;
  }

  async createAccount(payload: IAccountModel): Promise<RowDataAccount> {
    const [account] = (await db.query('INSERT INTO account SET ?', payload)) as ResultSetHeader[];
    if (account.changedRows === 0) throw new ServerException('artist was not created', 500);
    const accountCreated = await this.getAccountById(account.insertId);
    return accountCreated;
  }

  async activateDeactivateAccounts(ids: number[], status_id: number): Promise<void> {
    await db.beginTransaction();
    try {
      for (const account of ids) {
        await db.query(`UPDATE account SET status_id = ${status_id} WHERE account_id = ${account}`);
      }
      await db.commit();
    } catch (err) {
      await db.rollback();
      throw err;
    }
  }

  async addAmountToAccountBalance(account_id: number, amount: number): Promise<void> {
    await db.query(
      `UPDATE account a SET a.balance = a.balance + ${amount} WHERE a.account_id = ${account_id}`,
    );
  }

  async subtractAmountFromAccountBalance(account_id: number, amount: number): Promise<void> {
    await db.query(
      `UPDATE account a SET a.balance = a.balance - ${amount} WHERE a.account_id = ${account_id}`,
    );
  }
}

const accountRepository = new AccountRepository();
export default accountRepository;
