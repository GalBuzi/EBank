import { Request, Response } from 'express';
import family_service from '../services/family.services.js';
import { IFamilyAccountModel, IModifyFamilyAccount } from '../types/models.types.js';
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

  async closeFamilyAccount(req : Request, res : Response) {
    await family_service.closeFamilyAccount(Number(req.params.id));
    const response: ISuccessResponse = {
      status: 200,
      message: `Family account with id ${Number(req.params.id)} has been closed!`,
      data : req.params.id,
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

  async removeIndividualsFromFamily(req : Request, res : Response) {
    const result = await family_service.removeIndividualFromFamilyAccount(Number(req.params.id), req.body as IModifyFamilyAccount, req.query.display as string);
    const response: ISuccessResponse = {
      status: 200,
      message: `Family account with id ${result.family_account_id} has been modified!`,
      data: result,
    };
    res.status(response.status).json(response);
  }

  async addIndividuals(req : Request, res : Response) {
    const result = await family_service.addIndividualsToFamilyAccount(Number(req.params.id), req.body as IModifyFamilyAccount, req.query.display as string);
    const response: ISuccessResponse = {
      status: 200,
      message: `Family account with id ${result.family_account_id} has been modified!`,
      data: result,
    };
    res.status(response.status).json(response);
  }

  async transferF2B(req : Request, res : Response) {
    const { sourceId, destinationId } = req.params;
    const { amount } = req.query;
    const result = await family_service.transferF2B(
      Number(sourceId),
      Number(destinationId),
      Number(amount),
    );
    const response: ISuccessResponse = {
      status: 200,
      message: 'Transfer is complete',
      data: result,
    };
    res.status(response.status).json(response);
  }
}
const familyController = new FamilyController();
export default familyController;
