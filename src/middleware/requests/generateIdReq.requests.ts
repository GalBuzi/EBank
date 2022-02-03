import { NextFunction, Request, Response } from 'express';
import pkg from 'uuid';
const { v4: uuidv4 } = pkg;
export function addIDToRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) : void {
  req.request_id = uuidv4();
  next();
}