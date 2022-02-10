import { Request, Response, NextFunction, RequestHandler } from 'express';
import fetch from 'node-fetch';
import { IRateResult } from '../types/models.types.js';

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
  const url = `${baseUrl}?base=${base}&symbols=${currency}&access_key=36dc769935e003a051e569b22ce2571f`;
  const response = await fetch(url);
  const result = (await response.json()) as IRateResult;
  return Number(Object.values(result.rates)[0]);
}
