import { HttpException } from '../../exceptions/HttpException.exceptions.js';
import fs from 'fs';
import { Request, NextFunction, Response, ErrorRequestHandler } from 'express';
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