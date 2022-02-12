import {  ResultSetHeader, RowDataPacket } from 'mysql2';
import {  IBusinessAccountRecord } from '../../types/records.type.js';
import { db } from '../../utils/initializer.utils.js';
import { RowDataBusiness, RowDataIndividual } from '../../types/rowData.types.js';
import { IBusinessAccountDTO, IIndividualAccountDTO } from '../../types/dto.types.js';


export async function getBusinessAccountById(id: number):Promise<RowDataBusiness> {
  const [business] = await db.query(
    `SELECT * FROM business_account ba JOIN account a ON ba.account_id = a.account_id
    JOIN address ad ON ad.address_id = ba.address_id
    WHERE business_account_id = ${id}`) as RowDataPacket[];
  return business[0] as RowDataBusiness;
}

// export async function getAllBusinessAccount() : Promise<RowDataBusiness[]>{
//   const [accounts] = await db.query(
//     `SELECT * FROM business_account ba JOIN account a 
//         ON ba.account_id = a.account_id JOIN address ad ON ba.address_id = ad.address_id`) as RowDataPacket[][];
//   return accounts as RowDataBusiness[];
// }

export async function createBusinessAccount(payload : IBusinessAccountRecord) : Promise<RowDataBusiness>{
  const [business] = await db.query(
    'INSERT INTO business_account SET ?', payload) as ResultSetHeader[];
  const businessCreated = await getBusinessAccountById(business.insertId);   
  return businessCreated ;
}

export async function transferB2B(sourceAccount:IBusinessAccountDTO, destinationAccount : IBusinessAccountDTO, amount : number, toDeposit : number) : Promise<void> {
  await db.query(
    `UPDATE account a SET a.balance = a.balance - ${amount} WHERE a.account_id = ${sourceAccount.account_id}`,
  );
  await db.query(
    `UPDATE account a SET a.balance = a.balance + ${toDeposit} WHERE a.account_id = ${destinationAccount.account_id}`,
  ); 
}

export async function transferB2I(sourceAccount:IBusinessAccountDTO, destinationAccount : IIndividualAccountDTO, amount : number) : Promise<void> {
  const [resultSource] = await db.query(
    `UPDATE account a SET a.balance = a.balance - ${amount} WHERE a.account_id = ${sourceAccount.account_id}`,
  );
  const [resultDestination] = await db.query(
    `UPDATE account a SET a.balance = a.balance + ${amount} WHERE a.account_id = ${destinationAccount.account_id}`,
  ); 
  console.log(resultSource, resultDestination);
}


