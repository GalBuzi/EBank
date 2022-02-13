import { RequestHandler } from 'express';
import { ValidationException } from '../exceptions/ValidationException.excpetions.js';
import { inputValidationStringToFuncPointer } from '../utils/validations/input.validator.js';
import { validationConfigObj } from '../utils/initializer.utils.js';

export function validateRoute(validationRouteName: string) : RequestHandler {
  return function (req, res, next) {
    const allParams = { ...req.body, ...req.params, ...req.query };
    const validationRoute = validationConfigObj.routes.find(r => r.route === validationRouteName);
    const validAnswers : string[] = [];
    if (validationRoute) {
      const validFunctionsObj = validationRoute.validation_functions;
      validFunctionsObj.forEach(obj => {
        const func = inputValidationStringToFuncPointer[obj.func_name];
        const answers = func(allParams, obj.params, obj.params_values);
        validAnswers.push(...answers);
      });
    }
    const toNext = validAnswers.filter(ans => ans !== 'true');
    if (toNext.length === 0){
      next();
    } else {
      const msg = toNext.join(', ');
      next(new ValidationException(msg));
    } 
  };
}
