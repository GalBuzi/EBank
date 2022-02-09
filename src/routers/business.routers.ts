import errorWrapper from '../utils/helpers.utils.js';
import express from 'express';
import businessController from '../controllers/business.controllers.js';
class BusinessRouter {
  private _router = express.Router();

  constructor() {
    this.initRouting();
  }

  initRouting() {
    this._router.post('/',  errorWrapper(businessController.createBusinessAcc));
    //this._router.get('/', errorWrapper(businessController.getAllBusinessesAcc));
    this._router.get('/:id', errorWrapper(businessController.getBusinessAccountById));
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
