import fs from "fs";
import { NextFunction, Request, Response } from "express";
export function logHttpRequestMW(path: string) {
    const streamer = fs.createWriteStream(path, { flags: "a" });
    return (req: Request, res: Response, next: NextFunction) => {
        streamer.write(
            //${req.request_id}
            ` :: ${req.method} :: ${req.originalUrl} >> ${Date.now()} \n`
        );
        next();
    };
}