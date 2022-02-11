import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { ServerException } from '../../exceptions/ServerExcpetion.exceptions.js';
import { IAccountDTO } from '../../types/dto.types.js';
import { IAccountModel } from '../../types/models.types.js';
import { db } from '../../utils/initializer.utils.js';


export async function getAccountById(id : number) : Promise<IAccountDTO> {
  const sql = 'SELECT * FROM account WHERE account_id = ?';
  const results = await db.query(sql, id);
  const result: RowDataPacket[] = results[0] as RowDataPacket[];
  const account = result[0] as IAccountDTO;
  return account;
}
// export async function createAccount(payload : IAccountModel) : Promise<IAccountDTO>{
//   const sql = 'INSERT INTO account SET ?';
//   const results = await db.query(sql, payload);
//   const result: RowDataPacket = results[0] as RowDataPacket;
//   const account = await getAccountById(result.insertId) as IAccountDTO;
//   console.log(account)
//   return account;
// }

export async function createAccount(payload : IAccountModel) : Promise<IAccountDTO>{
  const [account] = await db.query(
    'INSERT INTO account SET ?', payload,
  ) as ResultSetHeader[];
  if (account.changedRows === 0) throw new ServerException('artist was not created', 500);
  const accountCreated = await getAccountById(account.insertId);      
  return accountCreated;
} 

