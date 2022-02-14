import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { IIdempotancyRecord } from '../../types/dto.types.js';
import { db } from '../../utils/initializer.utils.js';

export async function getSecertKey(access_key : string) : Promise<RowDataPacket> {
  console.log(access_key);
  const [rowSecretKey] = await db.query(`
  SELECT secret_key FROM access_secret WHERE access_key = ${JSON.stringify(access_key)}`) as RowDataPacket[];
  return rowSecretKey;
}

export async function getResponseByIdemKeyAccessKey(access: string, idem : string):Promise<IIdempotancyRecord[]>{
  const [idempotancyRecord] = await db.query(`
  SELECT * 
  FROM idempotancy 
  WHERE access_key = "${access}" AND idem_key = "${idem}" `) as RowDataPacket[];
  return idempotancyRecord as IIdempotancyRecord[];
}

export async function insertResponseToDB(access: string, idem : string, responseToUser: string, allParams: string) : Promise<ResultSetHeader>{
  console.log('responseToUser', responseToUser);
  console.log('allParams', allParams);
  
  const [business] = (await db.query(
    'INSERT INTO idempotancy (access_key, idem_key, response, params) VALUES (?, ?, ?, ?)',
    [access, idem, responseToUser, allParams],
  )) as ResultSetHeader[];
  return business;
}