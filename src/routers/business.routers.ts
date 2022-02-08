import errorWrapper from '../utils/helpers.utils.js';
import express from 'express';
import businessController from '../controllers/business.controllers.js';
class BusinessRouter {
  private _router = express.Router();

  constructor(){
    this.initRouting();
  }

  initRouting() {
    this._router.post('/', errorWrapper(businessController.createBusinessAcc));
    this._router.get('/', errorWrapper(businessController.getAllBusinessesAcc)); 
    this._router.get('/:id', errorWrapper(businessController.getBusinessAccountById));
    this._router.delete('/:id', errorWrapper(businessController.deleteBusinessByIdAcc));
    this._router.put('/:id', errorWrapper(businessController.updateBusinessByIdAcc));
    this._router.patch('/:id', errorWrapper(businessController.patchBusinessByIdAcc));
  }
    
  get router(){
    return this._router;
  }
}

const businessRouter = new BusinessRouter();
export default businessRouter;
