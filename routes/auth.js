import express from "express";
import * as authController from "../controllers/authController.js";
import validate from "../middlewares/validate.js";
import authValidation from "../validations/auth.validation.js";
const { registerSchema, loginSchema } = authValidation;

const router = express.Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

export default router;
