import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { IIndividualAccountRecord } from '../../types/records.type.js';
import { db } from '../../utils/initializer.utils.js';
import { RowDataIndividual } from '../../types/rowData.types.js';


export async function getIndividualAccountById(id : number) : Promise<RowDataIndividual>{
  const [account] = await db.query(
    'SELECT * FROM individual_account ia JOIN account a ON ia.account_id = a.account_id JOIN address ad ON ia.address_id =ad.address_id WHERE individual_account_id = ?', id,
  ) as RowDataPacket[];
  return account[0] as RowDataIndividual;
}

export async function getListOfIndividualsAccountsById(individualsId : number[]): Promise<RowDataIndividual[]>{
  const str = individualsId.join(',');
  const [individuals] = await db.query(
    `SELECT * FROM individual_account ia JOIN address a ON ia.address_id = a.address_id WHERE individual_account_id IN (${str})`) as RowDataPacket[];
  return individuals as RowDataIndividual[];
}
export async function createIndividualAccount(payload : IIndividualAccountRecord) : Promise<RowDataIndividual>{
  const [individual] = await db.query(
    'INSERT INTO individual_account SET ?', payload,
  ) as ResultSetHeader[];
  const individualCreated = await getIndividualAccountById(individual.insertId);   
  return individualCreated;
}

// export async function getAllIndividualsAcc() : Promise<RowDataIndividual[]> {
//   const [accounts] = await db.query(
//     'SELECT * FROM individual_account ia JOIN account a ON ia.account_id = a.account_id JOIN address ad ON ia.address_id =ad.address_id',
//   ) as RowDataPacket[];
//   return accounts as RowDataIndividual[];
// }


