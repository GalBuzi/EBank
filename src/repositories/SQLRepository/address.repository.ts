import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { IAddressModel } from '../../types/models.types.js';
import { IAddressDTO } from '../../types/dto.types.js';
import { db } from '../../utils/initializer.utils.js';
import { ServerException } from '../../exceptions/ServerExcpetion.exceptions.js';

export async function getAddressById(id : number) : Promise<IAddressDTO> {
  const sql = 'SELECT * FROM address WHERE address_id = ?';
  const results = await db.query(sql, id);
  const result: RowDataPacket[] = results[0] as RowDataPacket[];
  const address = result[0] as IAddressDTO;
  return address;
}

export async function createAddress(payload : IAddressModel) : Promise<IAddressDTO>{
  const [address] = await db.query(
    'INSERT INTO address SET ?', payload,
  ) as ResultSetHeader[];
  if (address.changedRows === 0) throw new ServerException('artist was not created', 500);
  const addressCreated = await getAddressById(address.insertId);        
  return addressCreated;
} 