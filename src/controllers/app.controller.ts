import { NextFunction, Request, Response } from "express";
import appService from "../services/app.service";

class AppController {
    async getAdminData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = appService.adminData();
            return res.json({ data });
        } catch (error) {
            next(error);
        }
    }

    async getProtectedData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = appService.protectedData();
            return res.json({ data });
        } catch (error) {
            next(error);
        }
    }

    async getGuestData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = appService.guestData();
            return res.json({ data });
        } catch (error) {
            next(error);
        }
    }

    async getPublicData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = appService.pulbicData();
            return res.json({ data });
        } catch (error) {
            next(error);
        }
    }

    async getHomePage(req: Request, res: Response, next: NextFunction) {
        try {
            const data = appService.homePage();
            return res.send(data);
        } catch (error) {
            next(error);
        }
    }
}

export default new AppController();
