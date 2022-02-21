import { NextFunction, Request, Response } from "express";
import jwtUtil from "../utils/jwt.util";

export default function (req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            //return next(AuthError.UnauthorizeError());
            throw new Error("Not authorized");
        }

        const accessToken = authHeader.split(" ")[1];
        if (!accessToken) {
            //return next(AuthError.UnauthorizeError());
            throw new Error("Not authorized");
        }

        const userData = jwtUtil.validateAccessToken(accessToken);
        if (!userData) {
            //return next(AuthError.UnauthorizeError());
            throw new Error("Not authorized");
        }

        //@ts-ignore
        req.user = userData;

        next();
    } catch (error) {
        throw error;
        //return next(AuthError.UnauthorizeError());
    }
}
