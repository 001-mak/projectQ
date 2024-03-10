import express from "express";
import {isAuthenticated} from '../middleware/isAuthenticated'
import { deleteUser, getUser, getUsers } from "../controllers/userController";
import { isAdmin } from "../middleware/isAdmin";
export const userRouter = express.Router();


userRouter.delete("/user/:id", isAuthenticated,isAdmin, deleteUser)
userRouter.get("/user/:id", isAuthenticated, getUser)
// userRouter.get("/users", isAuthenticated,isAdmin, getUsers)
userRouter.get("/users",getUsers)