import { Request, Response } from 'express';
import individualService from '../services/individual.services.js';
import { IIndividualAccountModel } from '../types/models.types.js';
import { ISuccessResponse } from '../types/responses.typings.js';
class IndividualController {

  async createIndividualAcc(req: Request, res: Response) {
    const result = await individualService.createIndividualAcc(req.body as IIndividualAccountModel);
    const response: ISuccessResponse = {
      status: 200,
      message: `Individual account with id ${result.individual_account_id} has been created!`,
      data: result,
    };
    res.status(response.status).json(response);
  }

  async getIndividualAccById(req: Request, res: Response) {
    const individual = await individualService.getIndividualById(Number(req.params.id));
    const response: ISuccessResponse = {
      status: 200,
      message: 'All Individual accounts have been loaded!',
      data: individual,
    };
    res.status(response.status).json(response);
  }

  async transferI2F(req: Request, res : Response){
    const { sourceId, destinationId } = req.params;
    const { amount } = req.query;
    const result = await individualService.transferI2F(
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

const individualController = new IndividualController();
export default individualController;
