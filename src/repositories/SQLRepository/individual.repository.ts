import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { ServerException } from '../../exceptions/ServerExcpetion.exceptions.js';
import { IIndividualAccountDTO, IIndividualAccountRecord } from '../../types/dto_models.types.js';
import { db } from '../../utils/initializer.utils.js';
import { getIndividualById } from '../../services/individual.services.js';
import { RowDataIndividual } from '../../types/builder.types.js';
export async function getIndividualAccountById(id : number) : Promise<RowDataIndividual>{
  const [account] = await db.query(
    'SELECT * FROM individual_account ia JOIN account a ON ia.account_id = a.account_id JOIN address ad ON ia.address_id =ad.address_id WHERE individual_account_id = ?', id,
  ) as RowDataPacket[];
  if (!account) throw new ServerException(`Individual with id ${id} doesn't exists.`);
  return account[0] as RowDataIndividual;

}
export async function createIndividualAccount(payload : IIndividualAccountRecord) : Promise<RowDataIndividual>{
  const [individual] = await db.query(
    'INSERT INTO individual_account SET ?', payload,
  ) as ResultSetHeader[];
  if (individual.changedRows === 0) throw new ServerException('artist was not created', 500);
  const individualCreated = await getIndividualAccountById(individual.insertId);   
  return individualCreated;
}

export async function getAllIndividualsAcc() : Promise<RowDataIndividual[]> {
  const [accounts] = await db.query(
    'SELECT * FROM individual_account ia JOIN account a ON ia.account_id = a.account_id JOIN address ad ON ia.address_id =ad.address_id',
  ) as RowDataPacket[];
  return accounts as RowDataIndividual[];
}


