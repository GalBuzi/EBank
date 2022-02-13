import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { IFamilyAccountRecord } from '../../types/records.type.js';
import { db } from '../../utils/initializer.utils.js';
import { RowDataFamily } from '../../types/rowData.types.js';
import { IBusinessAccountDTO, IFamilyAccountDTO } from '../../types/dto.types.js';
import individualRepository from './individual.repository.js';
import accountRepository from './account.repository.js';

class FamilyRepository {
  async getFamilyAccountByIdNoOwners(id: number): Promise<RowDataFamily> {
    const [family] = (await db.query(
      `SELECT * FROM family_account fa JOIN account a ON fa.account_id = a.account_id
     JOIN status s ON s.status_id = a.status_id
     WHERE fa.family_account_id = ${id}`,
    )) as RowDataPacket[];
    return family[0] as RowDataFamily;
  }

  async createFamilyAccount(familyToInsert: IFamilyAccountRecord): Promise<RowDataFamily> {
    const [family] = (await db.query(
      'INSERT INTO family_account SET ?',
      familyToInsert,
    )) as ResultSetHeader[];
    const familyCreated = await this.getFamilyAccountByIdNoOwners(family.insertId);
    return familyCreated;
  }

  async getFamilyAccountById(id: number): Promise<RowDataFamily[]> {
    const [family] = (await db.query(
      `SELECT * FROM family_account fa JOIN account a ON fa.account_id = a.account_id
    LEFT JOIN family_individual fi ON fa.family_account_id = fi.fam_account_id
	  JOIN status s ON s.status_id = a.status_id WHERE fa.family_account_id = ${id}`,
    )) as RowDataPacket[];
    return family as RowDataFamily[];
  }

  async createOwners(ownersId: number[], familyAccountId: number): Promise<number[]> {
    for (const id of ownersId) {
      await db.query(
        `INSERT INTO family_individual (fam_account_id,indiv_account_id)
      VALUES (${familyAccountId},${id})`,
      );
    }
    return ownersId as number[];
  }

  async closeFamilyAccount(id: number): Promise<void> {
    await db.query(
      `UPDATE account SET status_id = ${2} WHERE account_id = (
      SELECT account_id FROM family_account WHERE family_account_id = ${id})`,
    );
  }

  async removeIndividualFromFamilyAccount(
    family_account_id: number,
    indiv_ids: number[],
    amounts: number[],
    sumToSubtractFromFamilyAccount: number,
  ): Promise<void> {
    await db.beginTransaction();
    try {
      //delete rows from family_individual - connection between family account to owners account
      await db.query(
        `DELETE FROM family_individual WHERE indiv_account_id IN(${indiv_ids.join(
          ',',
        )}) AND fam_account_id = ${family_account_id}`,
      );

      const individualsFullDetails = await individualRepository.getListOfIndividualsAccountsById(
        indiv_ids,
      );

      // add amount to each individual account which removed from familt account
      for (const [i, person] of individualsFullDetails.entries()) {
        await accountRepository.addAmountToAccountBalance(person.account_id, amounts[i]);
      }

      //subtract from family account all the amounts
      const familyDetails = await this.getFamilyAccountById(family_account_id);
      await accountRepository.subtractAmountToAccountBalance(
        familyDetails[0].account_id,
        sumToSubtractFromFamilyAccount,
      );

      await db.commit();
    } catch (err) {
      await db.rollback();
      throw err;
    }
  }

  async addIndividualsToFamilyAccount(
    family_account_id: number,
    indiv_ids: number[],
    amounts: number[],
    sumToAddToFamilyAccount: number,
  ): Promise<void> {
    await db.beginTransaction();
    try {
      //add individuals to be owners of family
      for (const id of indiv_ids) {
        await db.query(
          `INSERT INTO family_individual (fam_account_id,indiv_account_id)
        VALUES (${family_account_id},${id})`,
        );
      }

      const individualsFullDetails = await individualRepository.getListOfIndividualsAccountsById(
        indiv_ids,
      );
      // subtract amount from each individual account which removed from familt account
      for (const [i, person] of individualsFullDetails.entries()) {
        await accountRepository.subtractAmountToAccountBalance(person.account_id, amounts[i]);
      }

      //add to family account all the amounts
      const familyDetails = await this.getFamilyAccountById(family_account_id);
      await accountRepository.subtractAmountToAccountBalance(
        familyDetails[0].account_id,
        sumToAddToFamilyAccount,
      );

      await db.commit();
    } catch (err) {
      await db.rollback();
      throw err;
    }
  }

  async transferF2B(
    sourceAccount: IFamilyAccountDTO,
    destinationAccount: IBusinessAccountDTO,
    amount: number,
  ): Promise<void> {
    await db.beginTransaction();
    try {
      await accountRepository.subtractAmountToAccountBalance(sourceAccount.account_id, amount);
      await accountRepository.addAmountToAccountBalance(destinationAccount.account_id, amount);
      await db.commit();
    } catch (err) {
      await db.rollback();
      throw err;
    }
  }
}

const familyRepository = new FamilyRepository();
export default familyRepository;
