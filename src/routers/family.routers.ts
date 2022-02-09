// import errorWrapper from '../utils/helpers.utils.js';
// import familyController from '../controllers/family.controllers.js';
// import express from 'express';

// class FamilyRouter {
//   private _router = express.Router();

//   constructor() {
//     this.initRouting();
//   }

//   initRouting() {
//     this._router.post('/', errorWrapper(familyController.createFamilyAcc));
//     this._router.get('/', errorWrapper(familyController.getAllFamilysAcc));
//     this._router.get('/:id', errorWrapper(familyController.getFamilyAccById));
//     this._router.delete('/:id', errorWrapper(familyController.deleteFamilyAccById));
//     this._router.put('/:id', errorWrapper(familyController.updateFamilyAccById));
//     this._router.patch('/:id', errorWrapper(familyController.patchFamilyAccById));
//   }

//   get router() {
//     return this._router;
//   }
// }

// const familyRouter = new FamilyRouter();
// export default familyRouter;
