import { Request, Response, NextFunction, RequestHandler } from 'express';
import * as UTILS from '../utils/initializer.utils.js';
import { ValidationException } from '../exceptions/ValidationException.excpetions.js';
export function checkParamsExist(model : string) : RequestHandler {
  const requiredParams = UTILS.initRequiredParams();
  return function paramsMiddleware(req : Request, res : Response, next : NextFunction) : void {
      const keys = requiredParams.get(model) as string[];
      keys.forEach(key => {
          if (!(key in req.body)) next(new ValidationException(`Field ${key} is mandatory!`));
      });
      next();
  };
}






