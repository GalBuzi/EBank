import errorWrapper from '../utils/helpers.utils.js';
import express from 'express';
import individualController from '../controllers/individual.controllers.js';
<<<<<<< HEAD
import { validateRoute } from '../middleware/validation.middleware.js';
import { InputValidationPerRoute } from '../utils/validations/types.validations.js';
import { authenticate } from '../middleware/authentication.middleware.js';
=======
import { authenticate } from '../middleware/authentication.middleware.js';
>>>>>>> upstream/main
class IndividualRouter {
  private _router = express.Router();

  constructor() {
    this.initRouting();
  }

  initRouting() {
    this._router.post('/',
      errorWrapper(validateRoute(InputValidationPerRoute.createIndividualAccount)),
      errorWrapper(individualController.createIndividualAcc));

    this._router.get('/:id',
      errorWrapper(authenticate),
      errorWrapper(validateRoute(InputValidationPerRoute.getIndividualAccountById)),
      errorWrapper(individualController.getIndividualAccById));
  }

  get router() {
    return this._router;
  }
}

const individualRouter = new IndividualRouter();
export default individualRouter;
