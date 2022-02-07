import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { ServerException } from '../../exceptions/ServerExcpetion.exceptions.js';
import { IIndividualAccountDTO, IIndividualAccountRecord } from '../../types/dto_models.types.js';
import { IAccountModel, IAddressModel, IIndividualAccountModel } from '../../types/models.types.js';
import { db } from '../../utils/initializer.utils.js';

export async function getIndividualAccountById(id : number) : Promise<IIndividualAccountDTO>{
  const sql = 'SELECT * FROM individual_account WHERE individual_account_id = ?';
  const results = await db.query(sql, id);
  const result: RowDataPacket[] = results[0] as RowDataPacket[];
  const individualAccount = result[0] as IIndividualAccountDTO;
  // if (result.length === 0)
  //     throw new ResourceNotFound(`Artist with id ${id} not found!`);
  return individualAccount;
}
export async function createIndividualAccount(payload : IIndividualAccountRecord) : Promise<IIndividualAccountDTO>{
  const [individual] = await db.query(
    'INSERT INTO individual_account SET ?', payload,
  ) as ResultSetHeader[];
  if (individual.changedRows === 0) throw new ServerException('artist was not created', 500);
  const individualCreated = await getIndividualAccountById(individual.insertId);   
  return individualCreated;
}

