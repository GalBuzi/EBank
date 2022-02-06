import { HttpException } from '../exceptions/HttpException.exceptions.js';
import fs from 'fs';
import { Request, NextFunction, Response, ErrorRequestHandler } from 'express';
import log from '@ajar/marker';
import { UrlNotFoundException } from '../exceptions/UrlNotFoundException.exceptions.js';
const { White, Reset, Red } = log.constants;

export function NotFound(req : Request, res : Response, next : NextFunction) {
  log.info(`url: ${White}${req.url}${Reset}${Red} not found...`);
  next(new UrlNotFoundException(req.url));
}

export function logHttpError(path: string) : ErrorRequestHandler {
  const streamer = fs.createWriteStream(path, { flags: 'a' });
  return function (
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction,
  ) : void {
    streamer.write(
      //${req.request_id} ::
      `${error.statusCode} :: ${error.message} :: ${Date.now()} >> ${
        error?.stack ? error.stack : ''
      } \n`,
    );
    next(error);
  };
}

export function ErrorResponse(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) :void {
  const response: IErrorResponse = {
    status: err.statusCode || 500,
    message: err.message,
    stack: err.stack || 'No trace stack.',
  };
  res.status(response.status).json(response);
}