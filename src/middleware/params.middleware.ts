import { IIndividualAccountDTO } from '../types/dto_models.types.js';
import { IAddressModel, IIndividualAccountModel } from '../types/models.types.js';
import { Request, Response, NextFunction } from 'express';

export function checkParamsExist(model : string) {
  return function paramsMiddleware(req : Request, res : Response, next : NextFunction) : void {
  };
}


const mapOfParams = new Map<string, string[]>();
mapOfParams.set('individual', []);


