import { NextFunction, Request, Response } from "express";
import pkg from "uuid";
const { v4: uuidv4 } = pkg;
export function addIDToRequest(
    req: Request,
    res: Response,
    next: NextFunction
) {
    req.request_id = uuidv4();
    next();
}