import builderSQL from '../utils/builder.utils.js';
import { Request, Response, NextFunction } from 'express';
import { ServerException } from '../exceptions/ServerExcpetion.exceptions.js';
import _ from 'lodash';

export async function findIdemKey(req : Request, res : Response, next : NextFunction) : Promise<void>{
  //passed authentication
  const accessKey = req.headers['x-access-key'] as string;
  //get idem_key from header
  const idemKey = req.headers['x-idem-key'] as string;
  if (accessKey === undefined || idemKey === undefined){
    next(new ServerException('no compltible headers were found'));
  }    
  const allParams = { ...req.params, ...req.query, ...req.body };
  //look for response related to that (idem_key + access) in DB
  const responseInDB = await builderSQL.getResponseByIdemKeyAccessKey(accessKey, idemKey);  
  console.log('responseInDB', responseInDB);
  // if found and params are same -> return the respones saved in db  
  if (responseInDB.length > 0){
    const isParamsEqual = _.isEqual(allParams, JSON.parse(responseInDB[0].params));    
    if (isParamsEqual) {      
      const parsed = JSON.parse(responseInDB[0].response);
      res.status(200).json(parsed);
    } else { //same idem key with differnt params then throw error
      throw new ServerException('precondition failed', 412);  
    }
  } else {    //else -> continue to do whatever he needs
    next();
  }

}