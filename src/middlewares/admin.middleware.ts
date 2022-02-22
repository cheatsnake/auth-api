import { NextFunction, Request, Response } from "express";
import ErrorUtil from "../utils/error.util";
import { Roles } from "../types";
import { FORBIDDEN } from "../constants/error.constants";

export default function (req: Request, res: Response, next: NextFunction) {
    try {
        //@ts-ignore
        if (!(req.user.role === Roles.ADMIN)) {
            throw new ErrorUtil(403, FORBIDDEN);
        }

        next();
    } catch (error) {
        next(error);
    }
}
