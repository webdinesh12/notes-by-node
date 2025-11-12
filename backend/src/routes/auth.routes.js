import express from "express";
import AuthController from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.js";
import { registerSchema, signinSchema } from "../validations/authValidation.js";

const router = express.Router();

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/signin", validate(signinSchema), AuthController.signIn);

export default router;
