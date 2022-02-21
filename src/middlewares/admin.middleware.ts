import { NextFunction, Request, Response } from "express";
import { Roles } from "../types";

export default function (req: Request, res: Response, next: NextFunction) {
    try {
        //@ts-ignore
        if (!req.user.role === Roles.ADMIN) {
            throw new Error("Not enough rights to access");
        }

        next();
    } catch (error) {
        throw error;
        //return next(AuthError.UnauthorizeError());
    }
}
