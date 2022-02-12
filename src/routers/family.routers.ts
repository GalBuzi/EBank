import errorWrapper from '../utils/helpers.utils.js';
import familyController from '../controllers/family.controllers.js';
import express from 'express';

class FamilyRouter {
  private _router = express.Router();

  constructor() {
    this.initRouting();
  }

  initRouting() {
    this._router.post('/', errorWrapper(familyController.createFamilyAccount));
    this._router.get('/:id', errorWrapper(familyController.getFamilyAccountById));
    this._router.put('/removeIndividuals/:id', errorWrapper(familyController.removeIndividualsFromFamily));
    this._router.put('/close/:id', errorWrapper(familyController.closeFamilyAccount));
    this._router.put('/addIndividuals/:id',errorWrapper(familyController.addIndividuals));
    this._router.put('/transferF2B/source/:sourceId/destination/:destinationId', errorWrapper(familyController.transferF2B));
  }

  get router() {
    return this._router;
  }
}

const familyRouter = new FamilyRouter();
export default familyRouter;
