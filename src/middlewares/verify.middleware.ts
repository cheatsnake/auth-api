import { NextFunction, Request, Response } from "express";
import ErrorUtil from "../utils/error.util";
import { NOT_VERIFIED } from "../constants/error.constants";

export default function (req: Request, res: Response, next: NextFunction) {
    try {
        //@ts-ignore
        if (!req.user.isActivated) {
            throw new ErrorUtil(406, NOT_VERIFIED);
        }

        next();
    } catch (error) {
        next(error);
    }
}
