import fs from 'fs';
import { NextFunction, Request, RequestHandler, Response } from 'express';
export function logHttpRequestMW(path: string) : RequestHandler {
  const streamer = fs.createWriteStream(path, { flags: 'a' });
  return function (req: Request, res: Response, next: NextFunction) : void {
    streamer.write(
      //${req.request_id}
      ` :: ${req.method} :: ${req.originalUrl} >> ${Date.now()} \n`,
    );
    next();
  };
}