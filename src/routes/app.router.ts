import { Router } from "express";
import adminMiddleware from "../middlewares/admin.middleware";
import guestMiddleware from "../middlewares/guest.middleware";
import verifyMiddleware from "../middlewares/verify.middleware";
import appController from "../controllers/app.controller";

const router = Router();

router.get(
    "/admin",
    guestMiddleware,
    adminMiddleware,
    appController.getAdminData
);
router.get(
    "/protected",
    guestMiddleware,
    verifyMiddleware,
    appController.getProtectedData
);
router.get("/guest", guestMiddleware, appController.getGuestData);
router.get("/public", appController.getPublicData);

export default router;
