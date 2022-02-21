import { Router } from "express";
import authController from "../controllers/auth.controller";
import tokenController from "../controllers/token.controller";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/activate/:link", authController.activate);
router.post("/logout", authController.logout);
router.get("/refresh", tokenController.refresh);

export default router;
