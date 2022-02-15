import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { IAddressModel } from '../../types/models.types.js';
import { db } from '../../utils/initializer.utils.js';
import { ServerException } from '../../exceptions/ServerExcpetion.exceptions.js';
import { RowDataAddress } from '../../types/rowData.types.js';

class AddressRepository {
  async getAddressById(id: number): Promise<RowDataAddress> {
    const sql = 'SELECT * FROM address WHERE address_id = ?';
    const results = await db.query(sql, id);
    const result: RowDataPacket[] = results[0] as RowDataPacket[];
    const address = result[0] as RowDataAddress;
    return address;
  }

  async createAddress(payload: IAddressModel): Promise<RowDataAddress> {
    const [address] = (await db.query('INSERT INTO address SET ?', payload)) as ResultSetHeader[];
    if (address.changedRows === 0) throw new ServerException('address was not created', 500);
    const addressCreated = await this.getAddressById(address.insertId);
    return addressCreated;
  }
}

const addressRepository = new AddressRepository();
export default addressRepository;
