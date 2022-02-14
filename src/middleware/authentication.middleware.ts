import crypto from 'crypto';
import builderSQL from '../utils/builder.utils.js';
import { Request, Response, NextFunction } from 'express';
import { ServerException } from '../exceptions/ServerExcpetion.exceptions.js';

export async function authenticate(req : Request, res : Response, next : NextFunction) : Promise<void>{
  const accessKey = req.headers['x-access-key'] as string;
  const givenHashed = req.headers['x-hashed'];
  const ts = req.headers['x-ts'] as string;
  const completeUrl = `${req.protocol}://${req.get('host') as string}${req.originalUrl}${JSON.stringify(req.body)}${ts}`;
  if (!accessKey) throw new ServerException('No access key provided!', 500);
  const secretKey = await builderSQL.getSecretByAccessKey(accessKey);
  console.log(completeUrl);
  const hashed = crypto.createHmac('sha256', secretKey).update(completeUrl).digest('hex');
  if (hashed !== givenHashed) throw new ServerException('Denied!', 500);
  next();
}