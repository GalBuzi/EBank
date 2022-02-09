import errorWrapper from '../utils/helpers.utils.js';
import express from 'express';
import individualController from '../controllers/individual.controllers.js';
import { checkParamsExist } from '../middleware/params.middleware.js';
class IndividualRouter {
  private _router = express.Router();

  constructor() {
    this.initRouting();
  }

  initRouting() {
    this._router.post(
      '/',
      errorWrapper(checkParamsExist('individual')),
      errorWrapper(individualController.createIndividualAcc),
    );
    //this._router.get('/', errorWrapper(individualController.getAllIndividualsAcc));
    this._router.get('/:id', errorWrapper(individualController.getIndividualAccById));
  }

  get router() {
    return this._router;
  }
}

const individualRouter = new IndividualRouter();
export default individualRouter;
