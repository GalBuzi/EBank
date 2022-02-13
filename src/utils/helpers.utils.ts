import { Request, Response, NextFunction, RequestHandler } from 'express';
import fetch from 'node-fetch';
import { IRateResult } from '../types/transfers.type.js';
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
  const url = `${baseUrl}?base=${base}&symbols=${currency}&access_key=d2a66464646b71360e0acc422b511633`;
  const response = await fetch(url);
  const result = (await response.json()) as IRateResult;
  console.log(result);
  
  return Number(Object.values(result.rates)[0]);
}



interface ActionToStatusId {
  [key : string] : number
}
export const actionToStatusId : ActionToStatusId = {
  'activate' : 1,
  'deactivate' : 2,
};