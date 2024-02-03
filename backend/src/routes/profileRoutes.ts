import express from "express";
import {isAuthenticated} from '../middleware/isAuthenticated'
import { createPackage, createProfile, createProfilePlatform, getProfilesList } from "../controllers/profileController";
export const profileRouter = express.Router();


profileRouter.post("/user/create-profile", isAuthenticated, createProfile)
profileRouter.post("/user/profile/create-profile-platform", isAuthenticated, createProfilePlatform)
profileRouter.post("/user/profile/create-package", isAuthenticated, createPackage)

profileRouter.get("/users", getProfilesList)