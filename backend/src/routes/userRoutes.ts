import express from "express";
import {isAuthenticated} from '../middleware/isAuthenticated'
import { deleteUser } from "../controllers/userController";
import { isAdmin } from "../middleware/isAdmin";
export const userRouter = express.Router();


userRouter.delete("/user/:id", isAuthenticated,isAdmin, deleteUser)