import { Request, Response } from 'express';
import individualService from '../services/individual.services.js';
import { IIndividualAccountModel } from '../types/models.types.js';
import { ISuccessResponse } from '../types/responses.typings.js';
import * as IdempotancyService from '../services/idempotancy.services.js';
class IndividualController {

  async createIndividualAcc(req: Request, res: Response) {
    const result = await individualService.createIndividualAcc(req.body as IIndividualAccountModel);
    const response: ISuccessResponse = {
      status: 200,
      message: `Individual account with id ${result.individual_account_id} has been created!`,
      data: result,
    };
    //save idempotancy details
    const allParams = JSON.stringify({ ...req.params, ...req.query, ...req.body });
    //take from req the response and save in db by idem_key
    await IdempotancyService.insertResponseToDB(req.headers['x-access-key'] as string,
      req.headers['x-idem-key'] as string, JSON.stringify(response), allParams);

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
}

const individualController = new IndividualController();
export default individualController;
