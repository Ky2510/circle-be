import { Router } from "express";
import authentication from "../middleware/authentication";
import { updateProfile, getProfile, getProfileById } from "../controller/profile";
import cloudinary from "../lib/cloudinary";
import uploadMiddleware  from "../middleware/upload";
const profileRouter = Router();
cloudinary.config();

profileRouter.patch("/profile", authentication, uploadMiddleware(),updateProfile);
profileRouter.get("/profile", authentication, getProfile);
profileRouter.get("/profile/:id", authentication, getProfileById);

export default profileRouter