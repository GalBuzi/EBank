import crypto from "crypto";
import builderSQL from '../utils/builder.utils.js';
import { Request,Response,NextFunction } from "express";
import { ServerException } from "../exceptions/ServerExcpetion.exceptions.js";
export async function authenticate(req : Request, res : Response, next : NextFunction) {
    const completeUrl = req.protocol + '://' + req.get('host') + req.originalUrl + JSON.stringify(req.body);
    const access_key = req.headers['x-access-key'] as string;
    const givenHashed = req.headers['x-hashed'];
    if (!access_key) throw new ServerException(`No access key provided!`,500);
    const secret_key = await builderSQL.getSecretByAccessKey(access_key);
    console.log(completeUrl);
    const hashed = crypto.createHmac('sha256',secret_key).update(completeUrl).digest('hex');
    if (hashed !== givenHashed) throw new ServerException('Denied!',500);
    next();
}