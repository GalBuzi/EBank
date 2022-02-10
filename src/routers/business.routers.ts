import errorWrapper from '../utils/helpers.utils.js';
import express from 'express';
import businessController from '../controllers/business.controllers.js';
import { validateRoute } from '../middleware/validation.middleware.js';
import { InputValidationPerRoute } from '../utils/validations/types.validations.js';
class BusinessRouter {
  private _router = express.Router();

  constructor() {
    this.initRouting();
  }

  initRouting() {
    this._router.post('/',
      errorWrapper(validateRoute(InputValidationPerRoute.createBusinessAccount)),
      errorWrapper(businessController.createBusinessAcc));
    //this._router.get('/', errorWrapper(businessController.getAllBusinessesAcc));
    this._router.get('/:id', 
      errorWrapper(validateRoute(InputValidationPerRoute.getBusinessAccountById)),
      errorWrapper(businessController.getBusinessAccountById));
    this._router.put(
      '/transferB2B/source/:sourceId/:destinationId',
      errorWrapper(businessController.transferB2B),
    );
    this._router.put(
      '/transferB2BFX/source/:sourceId/:destinationId',
      errorWrapper(businessController.transferB2BFX),
    );
    this._router.put(
      '/transferB2I/source/:sourceId/:destinationId',
      errorWrapper(businessController.transferB2I),
    );
  }

  get router() {
    return this._router;
  }

}

const businessRouter = new BusinessRouter();
export default businessRouter;
