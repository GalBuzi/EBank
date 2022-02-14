import errorWrapper from '../utils/helpers.utils.js';
import express from 'express';
import businessController from '../controllers/business.controllers.js';
import { validateRoute } from '../middleware/validation.middleware.js';
import { InputValidationPerRoute } from '../utils/validations/types.validations.js';
import { findIdemKey } from '../middleware/idempotancy.middleware.js';
class BusinessRouter {
  private _router = express.Router();

  constructor() {
    this.initRouting();
  }

  initRouting() {
    this._router.post('/', errorWrapper(findIdemKey),
      errorWrapper(validateRoute(InputValidationPerRoute.createBusinessAccount)),
      errorWrapper(businessController.createBusinessAcc));
  
    this._router.get('/:id', 
      errorWrapper(validateRoute(InputValidationPerRoute.getBusinessAccountById)),
      errorWrapper(businessController.getBusinessAccountById));
    
    this._router.put(
      '/transferB2B/source/:sourceID/destination/:destinationID',
      errorWrapper(validateRoute(InputValidationPerRoute.transferB2B)),
      errorWrapper(businessController.transferB2B));
  
    this._router.put(
      '/transferB2BFX/source/:sourceID/destination/:destinationID',
      errorWrapper(validateRoute(InputValidationPerRoute.transferB2B)),
      errorWrapper(businessController.transferB2BFX),
    );
  
    this._router.put(
      '/transferB2I/source/:sourceID/destination/:destinationID',
      errorWrapper(validateRoute(InputValidationPerRoute.transferB2I)),
      errorWrapper(businessController.transferB2I),
    );
  }

  get router() {
    return this._router;
  }

}

const businessRouter = new BusinessRouter();
export default businessRouter;
