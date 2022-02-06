import { Request, Response, NextFunction, RequestHandler } from 'express';

export default function errorWrapper(routingFunc: RequestHandler) {
  return async function (req: Request, res: Response, next: NextFunction) : Promise<void>{
    try {
      await routingFunc(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}