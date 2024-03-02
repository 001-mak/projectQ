import express from "express";
import {isAuthenticated} from '../middleware/isAuthenticated'
import { deleteUser, getUser } from "../controllers/userController";
import { isAdmin } from "../middleware/isAdmin";
export const userRouter = express.Router();


userRouter.delete("/user/:id", isAuthenticated,isAdmin, deleteUser)
userRouter.get("/user/:id", isAuthenticated,isAdmin, getUser)