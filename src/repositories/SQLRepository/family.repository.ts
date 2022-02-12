import {  ResultSetHeader, RowDataPacket } from 'mysql2';
import { IFamilyAccountRecord } from '../../types/records.type.js';
import { db } from '../../utils/initializer.utils.js';
import { RowDataFamily } from '../../types/rowData.types.js';

export async function getFamilyAccountByIdNoOwners(id: number):Promise<RowDataFamily> {
  const [family] = await db.query(
    `SELECT * FROM family_account fa JOIN account a ON fa.account_id = a.account_id
      WHERE fa.family_account_id = ${id}`) as RowDataPacket[];
  return family[0] as RowDataFamily;
}
export async function createFamilyAccount(familyToInsert : IFamilyAccountRecord) : Promise<RowDataFamily>{
  const [family] = await db.query(
    'INSERT INTO family_account SET ?', familyToInsert) as ResultSetHeader[];
  const familyCreated = await getFamilyAccountByIdNoOwners(family.insertId);
  return familyCreated;
}


// review the getFamilyAccountByIdDetailed + Shortened
export async function getFamilyAccountById(id : number) : Promise<RowDataFamily[]> {
  const [family] = await db.query(
    `SELECT * FROM family_account fa JOIN account a ON fa.account_id = a.account_id
    JOIN family_individual fi ON  fa.family_account_id = fi.fam_account_id
    WHERE fa.family_account_id = ${id}`,
  ) as RowDataPacket[];
  return family as RowDataFamily[];
}


export async function createOwners(ownersId : number[], familyAccountId : number) : Promise<number[]> {
  for (const id of ownersId) {
    console.log(id);
    await db.query(
      `INSERT INTO family_individual (fam_account_id,indiv_account_id)
      VALUES (${familyAccountId},${id})`,
    );
  }
  return ownersId as number[];
}


