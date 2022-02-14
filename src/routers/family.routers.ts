import errorWrapper from '../utils/helpers.utils.js';
import familyController from '../controllers/family.controllers.js';
import express from 'express';
import { validateRoute } from '../middleware/validation.middleware.js';
import { InputValidationPerRoute } from '../utils/validations/types.validations.js';
import { authenticate } from '../middleware/authentication.middleware.js';

class FamilyRouter {
  private _router = express.Router();

  constructor() {
    this.initRouting();
  }

  initRouting() {
    this._router.post('/', 
      errorWrapper(validateRoute(InputValidationPerRoute.createFamilyAccount)),
      errorWrapper(familyController.createFamilyAccount));

    this._router.get('/:id', errorWrapper(authenticate), 
      errorWrapper(validateRoute(InputValidationPerRoute.getFamilyAccountById)),
      errorWrapper(familyController.getFamilyAccountById));
    
    this._router.put('/removeIndividuals/:id',       
      errorWrapper(validateRoute(InputValidationPerRoute.removeIndividualFromFamily)),
      errorWrapper(familyController.removeIndividualsFromFamily));

    this._router.put('/close/:id', 
      errorWrapper(validateRoute(InputValidationPerRoute.closeFamilyAccount)),
      errorWrapper(familyController.closeFamilyAccount));
    
    this._router.put('/addIndividuals/:id', 
      errorWrapper(validateRoute(InputValidationPerRoute.addIndividualToFamily)),
      errorWrapper(familyController.addIndividuals));
    
    this._router.put('/transferF2B/source/:sourceId/destination/:destinationId', 
      errorWrapper(validateRoute(InputValidationPerRoute.addIndividualToFamily)),
      errorWrapper(familyController.transferF2B));
  }

  get router() {
    return this._router;
  }
}

const familyRouter = new FamilyRouter();
export default familyRouter;
