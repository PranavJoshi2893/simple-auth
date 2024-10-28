import * as userController from "../controller/user.controller";
import { Router } from "express";

const router = Router();

router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);

export default router;
