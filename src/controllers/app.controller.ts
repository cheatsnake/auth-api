import { NextFunction, Request, Response } from "express";
import appService from "../services/app.service";

class AppController {
    async getAdminData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = appService.adminData();
            return res.json({ data });
        } catch (error) {
            res.status(400).json({ message: String(error) });
        }
    }

    async getProtectedData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = appService.protectedData();
            return res.json({ data });
        } catch (error) {
            res.status(400).json({ message: String(error) });
        }
    }

    async getGuestData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = appService.guestData();
            return res.json({ data });
        } catch (error) {
            res.status(400).json({ message: String(error) });
        }
    }

    async getPublicData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = appService.pulbicData();
            return res.json({ data });
        } catch (error) {
            res.status(400).json({ message: String(error) });
        }
    }
}

export default new AppController();
