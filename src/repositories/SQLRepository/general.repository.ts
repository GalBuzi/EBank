import { RowDataPacket } from 'mysql2';
import { db } from '../../utils/initializer.utils.js';

export async function getSecertKey(access_key : string) : Promise<RowDataPacket> {
  console.log(access_key);
  const [rowSecretKey] = await db.query(`
  SELECT secret_key FROM access_secret WHERE access_key = ${JSON.stringify(access_key)}`) as RowDataPacket[];
  return rowSecretKey;
}

export async function getResponseByIdemKeyAccessKey(access: string, idem : string):Promise<RowDataPacket>{
  const [idempotancyRecord] = await db.query(`
  SELECT * FROM idempotancy WHERE access_key = ${access} AND idem_key = ${idem}`) as RowDataPacket[];
  return idempotancyRecord;
}

// export async function insertResponseToDB(access: string, idem : string, responseToUser: string) : Promise<RowDataPacket>{
// }