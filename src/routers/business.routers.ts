import errorWrapper from '../utils/helpers.utils.js';
import express from 'express';
import businessController from '../controllers/business.controllers.js';
import { validateRoute } from '../middleware/validation.middleware.js';
import { ValidationPerRoute } from '../utils/validator.js';
class BusinessRouter {
  private _router = express.Router();

<<<<<<< HEAD
  constructor(){    
=======
  constructor() {
>>>>>>> upstream/main
    this.initRouting();
  }

  initRouting() {
    this._router.post('/',
      errorWrapper(validateRoute(ValidationPerRoute.createBusinessAccount)),
      errorWrapper(businessController.createBusinessAcc));
    //this._router.get('/', errorWrapper(businessController.getAllBusinessesAcc));
    this._router.get('/:id', 
    errorWrapper(validateRoute(ValidationPerRoute.getBusinessAccountById)),
    errorWrapper(businessController.getBusinessAccountById));
    this._router.put(
      '/transferB2B/source/:sourceId/:destinationId',
      errorWrapper(businessController.transferB2B),
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
