import { OkPacket, RowDataPacket } from 'mysql2';
import { IAccountDTO } from '../../types/dto_models.types';
import { IAccount } from '../../types/models.types';
import { db } from '../../utils/initializer.utils.js';
export async function getAccountById(id : string) : Promise<IAccountDTO> {
    const sql = 'SELECT * FROM individual_account WHERE individual_id = ?';
    const results = await db.query(sql, id);
    const result: RowDataPacket[] = results[0] as RowDataPacket[];
    const account = result[0] as IAccountDTO;
    // if (result.length === 0)
    //     throw new ResourceNotFound(`Artist with id ${id} not found!`);
    return account;
  }
export async function createAccount(payload : IAccount) : Promise<IAccountDTO>{
  const sql = 'INSERT INTO account SET ?';
  console.log(payload);
  const results = await db.query(sql, payload);
  const result: RowDataPacket = results[0] as RowDataPacket;
  const account = await getAccountById(result.insertId) as IAccountDTO;
  return account;
}

