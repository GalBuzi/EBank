import { IIndividualAccountDTO } from '../types/dto_models.types.js';
import { IAddressModel, IIndividualAccountModel } from '../types/models.types.js';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ValidationException } from '../exceptions/ValidationException.excpetions.js';
import * as UTILS from '../utils/initializer.utils.js';

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


