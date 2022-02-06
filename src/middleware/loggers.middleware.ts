import fs from 'fs';
import { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from 'express';
import { HttpException } from '../exceptions/HttpException.exceptions';

export function logHttpRequestMW(path: string) : RequestHandler {
  const streamer = fs.createWriteStream(path, { flags: 'a' });
  return function (req: Request, res: Response, next: NextFunction) : void {
    streamer.write(
      `${req.request_id} :: ${req.method} :: ${req.originalUrl} >> ${Date.now()} \n`,
    );
    next();
  };
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

      `${req.request_id} :: ${error.statusCode} :: ${error.message} :: ${Date.now()} >> ${
        error?.stack ? error.stack : ''
      } \n`,
    );
    next(error);
  };
}