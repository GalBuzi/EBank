import errorWrapper from '../utils/helpers.utils.js';
import express from 'express';
import individualRouter from './individual.routers.js';
import businessRouter from './business.routers.js';
import familyRouter from './family.routers.js';

class AccountRouter {
  private _router = express.Router();

  constructor(){
    this.initRouting();
  }

  initRouting() {
    this._router.use('/individual', individualRouter.router);
    this._router.use('/business', businessRouter.router);
    this._router.use('/family', familyRouter.router);
  }
    
  get router(){
    return this._router;
  }
}
const accountRouter = new AccountRouter();
export default accountRouter;
