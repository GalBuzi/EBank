import { OkPacket, RowDataPacket } from 'mysql2';
import { IAccount, IIndividualAccount, IIndividualAccountUpdate } from '../../types/models.types';
import { db } from '../../utils/initializer.utils.js';

export async function getIndividualAccountById(id : string) {
  const sql = 'SELECT * FROM individual_account WHERE individual_id = ?';
  const results = await db.query(sql, id);
  const result: RowDataPacket[] = results[0] as RowDataPacket[];
  // if (result.length === 0)
  //     throw new ResourceNotFound(`Artist with id ${id} not found!`);
  return result[0];
}
export async function createIndividualAccount(payload : IIndividualAccount){
  const sql = 'INSERT INTO individual_account SET ?';
  const results = await db.query(sql, payload);
  const result: RowDataPacket = results[0] as RowDataPacket;
  const individualAccount = await getIndividualAccountById(result.insertId);
  return individualAccount;
}

