import { Request, Response } from 'express';
import * as businessService from '../services/business.services.js';

class BusinessController {

  async createBusinessAcc(req: Request, res :Response){
    const result = await businessService.createBusinessAccount(req.body);
    const response : ISuccessResponse = {
      status : 200,
      message : `Business account with id ${result.business_account_id} has been created!`,
      data : result,
    };
    res.status(response.status).json(response);
  }

  async getAllBusinessesAcc(req: Request, res : Response) {
    const result = await businessService.getAllBusinessAccount();
    const response : ISuccessResponse = {
      status : 200,
      message : 'Business accounts are retreived!',
      data : result,
    };
    res.status(response.status).json(response);
  }

  async getBusinessAccountById(req: Request, res : Response) {
    const result = await businessService.getBusinessAccountById(Number(req.params.id));
    const response : ISuccessResponse = {
      status : 200,
      message : `Business account with id ${result.business_account_id} is attached!`,
      data : result,
    };
    res.status(response.status).json(response);
  }

  async deleteBusinessByIdAcc(req: Request, res : Response) {
    
  }

  async updateBusinessByIdAcc(req: Request, res : Response) {

  }

  async patchBusinessByIdAcc(req: Request, res : Response) {

  }
}

const businessController = new BusinessController();
export default businessController;