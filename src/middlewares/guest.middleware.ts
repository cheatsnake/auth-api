import { NextFunction, Request, Response } from "express";
import ErrorUtil from "../utils/error.util";
import jwtUtil from "../utils/jwt.util";

export default function (req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw ErrorUtil.UnauthorizeError();
        }

        const accessToken = authHeader.split(" ")[1];
        if (!accessToken) {
            throw ErrorUtil.UnauthorizeError();
        }

        const userData = jwtUtil.validateAccessToken(accessToken);
        if (!userData) {
            throw ErrorUtil.UnauthorizeError();
        }

        //@ts-ignore
        req.user = userData;

        next();
    } catch (error) {
        next(error);
    }
}
