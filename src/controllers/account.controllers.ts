import { IChangeStatus } from '../types/models.types';
import { ISuccessResponse } from '../types/responses.typings';
import { Request, Response } from 'express';
import * as accountService from '../services/account.services.js';
class AccountController {
  async activateDeactivateAccounts(req : Request, res : Response){
    const result = await accountService.activateDeactivateAccounts(req.body as IChangeStatus);
    const response : ISuccessResponse = {
      status: 200,
      message: `All accounts have been ${result.status}d!`,
      data: result,
    };
    res.status(response.status).json(response);
  }
}

const accountController = new AccountController();
export default accountController;