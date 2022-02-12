import errorWrapper from '../utils/helpers.utils.js';
import familyController from '../controllers/family.controllers.js';
import express from 'express';
import { validateRoute } from '../middleware/validation.middleware.js';
import { InputValidationPerRoute } from '../utils/validations/types.validations.js';

class FamilyRouter {
  private _router = express.Router();

  constructor() {
    this.initRouting();
  }

  initRouting() {
    this._router.post('/',
      errorWrapper(validateRoute(InputValidationPerRoute.createFamilyAccount)),
      errorWrapper(familyController.createFamilyAccount));

    this._router.get('/:id', 
      errorWrapper(validateRoute(InputValidationPerRoute.getFamilyAccountById)),
      errorWrapper(familyController.getFamilyAccountById));
  }

  get router() {
    return this._router;
  }
}

const familyRouter = new FamilyRouter();
export default familyRouter;
