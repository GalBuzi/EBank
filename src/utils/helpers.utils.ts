import { Request, Response, NextFunction, RequestHandler } from 'express';
import { RowDataPacket } from 'mysql2';
import fetch from 'node-fetch';
import { ISecretKey } from '../types/dto.types.js';
import { IRateResult } from '../types/transfers.type.js';
import { db } from './initializer.utils.js';
export default function errorWrapper(routingFunc: RequestHandler):RequestHandler {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await routingFunc(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
export async function getRate(base: string, currency: string): Promise<number> {
  const baseUrl = 'http://api.exchangeratesapi.io/latest';
  const url = `${baseUrl}?base=${base}&symbols=${currency}&access_key=c2fde0c2528d1735144403fc92dd310a`;
  const response = await fetch(url);
  const result = (await response.json()) as IRateResult;
  return Number(Object.values(result.rates)[0]);
}



interface ActionToStatusId {
  [key : string] : number
}
export const actionToStatusId : ActionToStatusId = {
  'activate' : 1,
  'deactivate' : 2,
};