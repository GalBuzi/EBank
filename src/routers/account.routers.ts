import express from 'express';
import individualRouter from './individual.routers.js';
import businessRouter from './business.routers.js';
import familyRouter from './family.routers.js';
import accountController from '../controllers/account.controllers.js';
import { authenticate } from '../middleware/authentication.middleware.js';
import errorWrapper from '../utils/helpers.utils.js';
class AccountRouter {
  private _router = express.Router();

  constructor() {
    this.initRouting();
  }

  initRouting() {
    this._router.put('/activateDeactivateAccounts', errorWrapper(authenticate), accountController.activateDeactivateAccounts);
    this._router.use('/individual', errorWrapper(authenticate), individualRouter.router);
    this._router.use('/business', errorWrapper(authenticate), businessRouter.router);
    this._router.use('/family', errorWrapper(authenticate), familyRouter.router);
  }

  get router() {
    return this._router;
  }
}
const accountRouter = new AccountRouter();
export default accountRouter;
