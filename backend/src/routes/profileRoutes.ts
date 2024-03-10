import express from "express";
import multer from "multer";
import {isAuthenticated} from '../middleware/isAuthenticated'
import { createPackage, createProfile, createProfilePlatform, getProfilesList } from "../controllers/profileController";
export const profileRouter = express.Router();


profileRouter.post("/user/create-profile", isAuthenticated, createProfile)
profileRouter.post("/user/profile/create-profile-platform", isAuthenticated, createProfilePlatform)
profileRouter.post("/user/profile/create-package", isAuthenticated, createPackage)

profileRouter.get("/users", getProfilesList)
  

// ****PROFILE PICTURE UPLOAD ROUTE******
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./uploads/avatars`)
      },
      filename: function (req, file, cb) {
        console.log(req.query)
        const filename : string = req.query.userId as string
        cb(null, filename)
      }
  })

  const upload = multer({storage})
  
profileRouter.post("/user/upload-avatar", isAuthenticated, upload.single("avatar"),(req,res)=>{
    return res.status(200).send("image uploaded")
})
