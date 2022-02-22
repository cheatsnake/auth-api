import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import ErrorUtil from "../utils/error.util";

export default function (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof ErrorUtil) {
        return res
            .status(err.status)
            .json({ message: err.message, errors: err.errors });
    }

    return res.status(520).json({ message: String(err) });
}
