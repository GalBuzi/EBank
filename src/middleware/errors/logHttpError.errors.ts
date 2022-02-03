import { HttpException } from "../../exceptions/HttpException.exceptions.js";
import fs from "fs";
import { Request, NextFunction, Response } from "express";
export function logHttpError(path: string) {
    const streamer = fs.createWriteStream(path, { flags: "a" });
    return (
        error: HttpException,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        streamer.write(
            //${req.request_id} ::
            `${error.statusCode} :: ${error.message} :: ${Date.now()} >> ${
                error.stack
            } \n`
        );
        next(error);
    };
}