import { NextFunction, Request, Response } from "express";
import tokenService from "../services/token.service";
import { TOKEN_MAX_AGE } from "../constants/app.constants";

class TokenController {
    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await tokenService.refresh(refreshToken);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: TOKEN_MAX_AGE,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }
}

export default new TokenController();
