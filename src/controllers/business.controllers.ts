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

  async transferB2B(req : Request, res : Response) {
    const result = await businessService.transferB2B(req.body);
    const response : ISuccessResponse = {
      status : 200,
      message : 'Transfer is complete',
      data : result,
    };
    res.status(response.status).json(response);
  }

  async transferB2I(req : Request, res : Response) {
    const result = await businessService.transferB2I(req.body);
    const response : ISuccessResponse = {
      status : 200,
      message : 'Transfer is complete',
      data : result,
    };
    res.status(response.status).json(response);
  }


}

const businessController = new BusinessController();
export default businessController;