import { RequestHandler } from 'express';
import { ValidationException } from '../exceptions/ValidationException.excpetions.js';
import { validationConfigObj, validationStringToFuncPointer } from '../utils/validator.js';


export function validateRoute(validationRouteName: string) : RequestHandler {
  return function (req, res, next) {
    const allParams = { ...req.body, ...req.params, ...req.query };
    const validationRoute = validationConfigObj.routes.find(r => r.route === validationRouteName);
    const validAnswers : string[] = [];
    if (validationRoute) {
      const validFunctionsObj = validationRoute.validation_functions;
      validFunctionsObj.forEach(obj => {
        const func = validationStringToFuncPointer[obj.func_name];
        const answers = func(allParams, obj.params, obj.params_values);
        validAnswers.push(answers.join(','));
      });
    }
    console.log(validAnswers);
    const toNext = validAnswers.filter(ans => ans !== 'true');
    if (toNext.length === 0){
      next();
    } else {
      const msg = toNext.join(',');
      next(new ValidationException(msg));
    } 
  };
}
