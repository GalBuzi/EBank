import builderSQL from '../utils/builder.utils.js';
import { Request, Response, NextFunction } from 'express';
import { ServerException } from '../exceptions/ServerExcpetion.exceptions.js';

export async function findIdemKey(req : Request, res : Response, next : NextFunction) : Promise<void>{
  //passed authentication
  const accessKey = req.headers['x-access-key'] as string;
  //get idem_key from header
  const idemKey = req.headers['idem-key'] as string;
  if (accessKey === undefined || idemKey === undefined){
    next(new ServerException('no compltible headers were found'));
  }
  //look for response related to that (idem_key + access) in DB
  const responseInDB = await builderSQL.getResponseByIdemKeyAccessKey(accessKey, idemKey);
  // if found -> return the respones saved in db
  if (responseInDB) {
    const parsed = JSON.parse(responseInDB);
    res.status(200).json(parsed);
  }
  //else -> continue to do whatever he needs
  next();

  //take from req the response and save in db by idem_key
  await builderSQL.insertResponseToDB(accessKey, idemKey, req.responseToUser);

}