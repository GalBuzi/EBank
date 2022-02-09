import {  ResultSetHeader, RowDataPacket } from 'mysql2';
import { ServerException } from '../../exceptions/ServerExcpetion.exceptions.js';
import {  IBusinessAccountRecord } from '../../types/dto_models.types.js';
import { db } from '../../utils/initializer.utils.js';
import { RowDataBusiness } from '../../types/builder.types.js';
import { ITransferB2B } from '../../types/models.types.js';
import { ValidationException } from '../../exceptions/ValidationException.excpetions.js';

export async function getBusinessAccountById(id: number):Promise<RowDataBusiness> {
  const [business] = await db.query(
    `SELECT * FROM business_account ba JOIN account a ON ba.account_id = a.account_id
    JOIN address ad ON ad.address_id = ba.address_id
    WHERE business_account_id = ${id}`) as RowDataPacket[][];
  if (business.length === 0) throw new ServerException('business id wasnt found', 500);
  return business[0] as RowDataBusiness;
}

export async function getAllBusinessAccount() : Promise<RowDataBusiness[]>{
  const [accounts] = await db.query(
    `SELECT * FROM business_account ba JOIN account a 
        ON ba.account_id = a.account_id JOIN address ad ON ba.address_id = ad.address_id`) as RowDataPacket[][];
  return accounts as RowDataBusiness[];
}

export async function createBusinessAccount(payload : IBusinessAccountRecord) : Promise<RowDataBusiness>{
  const [business] = await db.query(
    'INSERT INTO business_account SET ?', payload) as ResultSetHeader[];
  if (business.changedRows === 0) throw new ServerException('artist was not created', 500);
  const businessCreated = await getBusinessAccountById(business.insertId);   
  return businessCreated ;
}

export async function transferB2B(data:ITransferB2B) : Promise<void> {
  const sourceAccount =  await getBusinessAccountById(data.sourceAccount);
  const destinationAccountId =  await getBusinessAccountById(data.destinationAccount);
  await db.query(
    `UPDATE account a SET a.balance = a.balance - ${data.amount} WHERE a.account_id = ${sourceAccount.account_id}`,
  );
  await db.query(
    `UPDATE account a SET a.balance = a.balance + ${data.amount} WHERE a.account_id = ${destinationAccountId.account_id}`,
  ); 
}


