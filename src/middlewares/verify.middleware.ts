import { NextFunction, Request, Response } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
    try {
        //@ts-ignore
        if (!req.user.isActivated) {
            throw new Error("Email is not verified");
        }

        next();
    } catch (error) {
        throw error;
        //return next(AuthError.UnauthorizeError());
    }
}
