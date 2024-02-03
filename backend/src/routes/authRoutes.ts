import express from 'express'
import { forgotPassword, login, register, verifyEmail } from '../controllers/authController';
export const authRouter = express.Router();

authRouter.post("/register", register);
// authRouter.get("/verifyEmail/:token", verifyEmail)
authRouter.post("/verify", verifyEmail)
authRouter.post("/login", login)
authRouter.get("/forgot-password", forgotPassword)
authRouter.post("/forgot-password?key=value1&token=value2")

