import { Request, Response } from 'express';
import * as individualService from "../services/individual.services.js";
class IndividualController {

  async createIndividualAcc(req: Request, res :Response){
    const result = await individualService.createIndividualAcc(req.body);
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