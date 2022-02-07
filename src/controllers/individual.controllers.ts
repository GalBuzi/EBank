import { Request, Response } from 'express';
import * as individualService from '../services/individual.services.js';
class IndividualController {

  async createIndividualAcc(req: Request, res :Response){
    const result = await individualService.createIndividualAcc(req.body);
    const response : ISuccessResponse = {
      status : 200,
      message : `Individual account with id ${result.individual_account_id} has been created!`,
      data : result,
    };
    res.status(response.status).json(response);
  }

  async getAllIndividualsAcc(req: Request, res : Response) {

  }

  async getIndividualAccById(req: Request, res : Response) {

  }

  async deleteIndividualAccById(req: Request, res : Response) {

  }

  async updateIndividualAccById(req: Request, res : Response) {

  }

  async patchIndividualAccById(req: Request, res : Response) {

  }
}

const individualController = new IndividualController();
export default individualController;