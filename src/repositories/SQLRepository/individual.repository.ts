import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { IIndividualAccountRecord } from '../../types/records.type.js';
import { db } from '../../utils/initializer.utils.js';
import { RowDataIndividual } from '../../types/rowData.types.js';

class IndividualRepository {
  async getIndividualAccountById(id: number): Promise<RowDataIndividual> {
    const [account] = (await db.query(
      `SELECT * FROM individual_account ia JOIN account a ON ia.account_id = a.account_id 
    JOIN address ad ON ia.address_id =ad.address_id 
    JOIN status s ON s.status_id = a.status_id
    WHERE individual_account_id = ?`,
      id,
    )) as RowDataPacket[];
    return account[0] as RowDataIndividual;
  }

  async getListOfIndividualsAccountsById(individualsId: number[]): Promise<RowDataIndividual[]> {
    const str = individualsId.join(',');
    console.log(str);
    const [individuals] = (await db.query(
      `SELECT * FROM individual_account ia JOIN account a ON ia.account_id = a.account_id 
    JOIN address ad ON ia.address_id = ad.address_id 
    JOIN status s ON s.status_id = a.status_id
    WHERE individual_account_id IN (${str})`,
    )) as RowDataPacket[];
    return individuals as RowDataIndividual[];
  }

  async createIndividualAccount(payload: IIndividualAccountRecord): Promise<RowDataIndividual> {
    const [individual] = (await db.query(
      'INSERT INTO individual_account SET ?',
      payload,
    )) as ResultSetHeader[];
    const individualCreated = await this.getIndividualAccountById(individual.insertId);
    return individualCreated;
  }
}

const individualRepository = new IndividualRepository();
export default individualRepository;
