import { HttpException } from '../exceptions/HttpException.exceptions.js';
import { Request, NextFunction, Response } from 'express';
import log from '@ajar/marker';
import { UrlNotFoundException } from '../exceptions/UrlNotFoundException.exceptions.js';
const { White, Reset, Red } = log.constants;

export function NotFound(req : Request, res : Response, next : NextFunction) :void {
  log.info(`url: ${White}${req.url}${Reset}${Red} not found...`);
  next(new UrlNotFoundException(req.url));
}

export function ErrorResponse(err: HttpException, req: Request, res: Response, next: NextFunction,
) : Response {
  const response: IErrorResponse = {
    status: err.statusCode || 500,
    message: err.message,
    stack: err.stack || 'No trace stack.',
  };
  return res.status(response.status).json(response);
  next();
}