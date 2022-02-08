import {ResultSetHeader, RowDataPacket } from 'mysql2';
import {ServerException } from '../../exceptions/ServerExcpetion.exceptions.js';
import {IIndividualAccountDTO, IIndividualAccountRecord } from '../../types/dto_models.types.js';
import { db } from '../../utils/initializer.utils.js';
import {RowPacketInfo} from '../../types/builder.types.js';
import {getIndividualById} from "../../services/individual.services.js";
export async function getIndividualAccountById(id : number) : Promise<RowPacketInfo[]>{
  const [account] = await db.query(
    'SELECT * FROM individual_account ia JOIN account a ON ia.account_id = a.account_id JOIN address ad ON ia.address_id =ad.address_id WHERE individual_account_id = ?',id
  ) as RowDataPacket[];
  if (!account) throw new ServerException(`Individual with id ${id} doesn't exists.`);
  return account as RowDataPacket[];

}
export async function createIndividualAccount(payload : IIndividualAccountRecord) : Promise<IIndividualAccountDTO>{
  const [individual] = await db.query(
    'INSERT INTO individual_account SET ?', payload,
  ) as ResultSetHeader[];
  if (individual.changedRows === 0) throw new ServerException('artist was not created', 500);
  const individualCreated = await getIndividualById(individual.insertId);   
  return individualCreated;
}

export async function getAllIndividualsAcc() : Promise<RowPacketInfo[]> {
  const [accounts] = await db.query(
    'SELECT * FROM individual_account ia JOIN account a ON ia.account_id = a.account_id JOIN address ad ON ia.address_id =ad.address_id'
  ) as RowDataPacket[];
  return accounts as RowPacketInfo[];
}

export async function deleteIndividualAccById(id : number) : Promise<RowPacketInfo[]> {
  const deleted_account = await getIndividualAccountById(id);   
  const [result] = await db.query(
    `DELETE FROM individual_account WHERE individual_account_id = ?`
  );
  return deleted_account as RowDataPacket[];
}

