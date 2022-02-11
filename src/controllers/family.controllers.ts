import { Request, Response } from 'express';
import family_service from '../services/family.services.js';
import { IFamilyAccountModel } from '../types/models.types.js';
import { ISuccessResponse } from '../types/responses.typings.js';
class FamilyController {
  async createFamilyAccount(req: Request, res: Response) {
    const result = await family_service.createFamilyAcc(req.body as IFamilyAccountModel);
    const response: ISuccessResponse = {
      status: 200,
      message: `Family account with id ${result.family_account_id} has been created!`,
      data: result,
    };
    res.status(response.status).json(response);
  }

  async getFamilyAccountById(req: Request, res: Response) {
    const result = await family_service.getFamilyAccountById(Number(req.params.id), req.query.detailed as string);
    const response: ISuccessResponse = {
      status: 200,
      message: `Family account with id ${result.family_account_id} has been loaded!`,
      data: result,
    };
    res.status(response.status).json(response);
  }
}
const familyController = new FamilyController();
export default familyController;
