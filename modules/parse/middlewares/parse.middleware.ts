import {Request, Response, NextFunction} from "express";
import {StatusCodes} from 'http-status-codes';
import {parseWebURLService} from "../services/parse.service";

export async function parseWebURL(req: Request, res: Response, next: NextFunction) {
    //TODO: check url is valid ?
    if (!req.body?.url) {
        res.sendStatus(StatusCodes.BAD_REQUEST)
    }
    try {
        await parseWebURLService(req.body.url);
        res.json({
            status: 'OK'
        });
    } catch (err) {
        //TODO log error message ?
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}