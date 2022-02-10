import { Request, Response } from 'express';
import businessService from '../services/business.services.js';
import { IBusinessAccountModel } from '../types/models.types.js';
import { ISuccessResponse } from '../types/responses.typings.js';

class BusinessController {
  async createBusinessAcc(req: Request, res: Response) {
    const result = await businessService.createBusinessAccount(req.body as IBusinessAccountModel);
    const response: ISuccessResponse = {
      status: 200,
      message: `Business account with id ${result.business_account_id} has been created!`,
      data: result,
    };
    res.status(response.status).json(response);
  }

  // async getAllBusinessesAcc(req: Request, res: Response) {
  //   const result = await businessService.getAllBusinessAccount();
  //   const response: ISuccessResponse = {
  //     status: 200,
  //     message: 'Business accounts are retreived!',
  //     data: result,
  //   };
  //   res.status(response.status).json(response);
  // }

  async getBusinessAccountById(req: Request, res: Response) {
    const result = await businessService.getBusinessAccountById(Number(req.params.id));
    const response: ISuccessResponse = {
      status: 200,
      message: `Business account with id ${result.business_account_id} is attached!`,
      data: result,
    };
    res.status(response.status).json(response);
  }

  async transferB2B(req: Request, res: Response) {
    const { sourceId, destinationId } = req.params;
    const { amount } = req.query;
    const result = await businessService.transferB2B(
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

  async transferB2BFX(req: Request, res: Response) {
    const { sourceId, destinationId } = req.params;
    const { amount } = req.query;
    const result = await businessService.transferB2BFX(
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

  async transferB2I(req: Request, res: Response) {
    const { sourceId, destinationId } = req.params;
    const { amount } = req.query;
    const result = await businessService.transferB2I(
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

const businessController = new BusinessController();
export default businessController;
