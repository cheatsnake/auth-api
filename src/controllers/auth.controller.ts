import { NextFunction, Request, Response } from "express";
import authService from "../services/auth.service";
import { TOKEN_MAX_AGE } from "../constants/app.constants";

class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await authService.register(req.body);
            res.cookie("refreshToken", user.refreshToken, {
                maxAge: TOKEN_MAX_AGE,
                httpOnly: true,
            });
            return res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await authService.login(req.body);
            res.cookie("refreshToken", user.refreshToken, {
                maxAge: TOKEN_MAX_AGE,
                httpOnly: true,
            });
            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link;
            await authService.activate(activationLink);
            return res.redirect(String(process.env.API_URL));
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            await authService.logout(refreshToken);
            res.clearCookie("refreshToken");
            return res.status(200).json();
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();
