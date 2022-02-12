import {  ResultSetHeader, RowDataPacket } from 'mysql2';
import { IFamilyAccountRecord } from '../../types/records.type.js';
import { db } from '../../utils/initializer.utils.js';
import { RowDataFamily } from '../../types/rowData.types.js';
import { IBusinessAccountDTO, IFamilyAccountDTO } from '../../types/dto.types.js';

export async function getFamilyAccountByIdNoOwners(id: number):Promise<RowDataFamily> {
  const [family] = await db.query(
    `SELECT * FROM family_account fa JOIN account a ON fa.account_id = a.account_id
     JOIN status s ON s.status_id = a.status_id
     WHERE fa.family_account_id = ${id}`) as RowDataPacket[];
  return family[0] as RowDataFamily;
}
export async function createFamilyAccount(familyToInsert : IFamilyAccountRecord) : Promise<RowDataFamily>{
  const [family] = await db.query(
    'INSERT INTO family_account SET ?', familyToInsert) as ResultSetHeader[];
  const familyCreated = await getFamilyAccountByIdNoOwners(family.insertId);
  return familyCreated;
}

export async function getFamilyAccountById(id : number) : Promise<RowDataFamily[]> {
  const [family] = await db.query(
    `SELECT * FROM family_account fa JOIN account a ON fa.account_id = a.account_id
    LEFT JOIN family_individual fi ON fa.family_account_id = fi.fam_account_id
	  JOIN status s ON s.status_id = a.status_id WHERE fa.family_account_id = ${id}`,
  ) as RowDataPacket[];
  return family as RowDataFamily[];
}


export async function createOwners(ownersId : number[], familyAccountId : number) : Promise<number[]> {
  for (const id of ownersId) {
    await db.query(
      `INSERT INTO family_individual (fam_account_id,indiv_account_id)
      VALUES (${familyAccountId},${id})`,
    );
  }
  return ownersId as number[];
}

export async function closeFamilyAccount(id : number) : Promise<void>{
  await db.query(
    `UPDATE account SET status_id = ${2} WHERE account_id = (
      SELECT account_id FROM family_account WHERE family_account_id = ${id})`,
  );
}

export async function removeIndividualFromFamilyAccount(family_account_id : number, indiv_ids : string) : Promise<void> {
  await db.query(
    `DELETE FROM family_individual WHERE indiv_account_id IN(${indiv_ids}) AND fam_account_id = ${family_account_id}`,
  );
}

export async function addIndividualsToFamilyAccount(family_account_id : number, indiv_ids : number[]) : Promise<void> {
  for (const id of indiv_ids) {
    await db.query(
      `INSERT INTO family_individual (fam_account_id,indiv_account_id)
      VALUES (${family_account_id},${id})`,
    );
  }
}

export async function transferF2B(sourceAccount:IFamilyAccountDTO, destinationAccount : IBusinessAccountDTO, amount : number) : Promise<void> {
  await db.query(
    `UPDATE account a SET a.balance = a.balance - ${amount} WHERE a.account_id = ${sourceAccount.account_id}`,
  );
  await db.query(
    `UPDATE account a SET a.balance = a.balance + ${amount} WHERE a.account_id = ${destinationAccount.account_id}`,
  ); 
}


