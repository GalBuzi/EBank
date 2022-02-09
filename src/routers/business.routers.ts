import errorWrapper from '../utils/helpers.utils.js';
import express from 'express';
import businessController from '../controllers/business.controllers.js';
import { validateRoute } from '../middleware/validation.middleware.js';
import { ValidationPerRoute } from '../validators/general.validator.js';
class BusinessRouter {
  private _router = express.Router();

  constructor(){    
    this.initRouting();
  }

  initRouting() {
    this._router.post('/', 
      errorWrapper(validateRoute(ValidationPerRoute.createBusinessAccount)),
      errorWrapper(businessController.createBusinessAcc));
    this._router.get('/',
      errorWrapper(businessController.getAllBusinessesAcc)); 
    this._router.get('/:primary_id', 
      errorWrapper(validateRoute(ValidationPerRoute.getBusinessAccountById)),
      errorWrapper(businessController.getBusinessAccountById));
  }
    
  get router(){
    return this._router;
  }

}

const businessRouter = new BusinessRouter();
export default businessRouter;
