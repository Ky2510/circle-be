import { Request, Response } from "express";
import * as profileServices from "../service/profile";
import {v2 as cloudinary} from "cloudinary";

export const updateProfile = async (req: Request, res: Response) => {
   try {
      const userId = res.locals.user;
      const { body } = req;

      console.log("awal", body)

      if (!req.files) {
         await profileServices.updateProfile(userId, body);
         res.json({ status: true, message:'sukses'});
         return;
      }

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      if (files.cover && files.cover.length > 0) {
         const cover = files.cover[0].filename;
         const cloudinaryResponse = await cloudinary.uploader.upload(
            "./src/uploads/" + cover,
         );
         body.cover = cloudinaryResponse.secure_url;
      }

      if (files.avatar && files.avatar.length > 0) {
         const avatar = files.avatar[0].filename;
         const cloudinaryResponse = await cloudinary.uploader.upload(
            "./src/uploads/" + avatar,
         );
         body.avatar = cloudinaryResponse.secure_url;
      }

      await profileServices.updateProfile(userId, body);

      res.json({
         status: true,
         message: "success",
      });
   } catch (error) {
      const err = error as Error;
      console.log(err);

      res.status(500).json({
         status: false,
         message: err.message,
      });
   }
};


export const getProfile = async (req: Request, res: Response) => {
   try {
      const userId = res.locals.user;

      const profile = await profileServices.getProfile(userId);

      res.json({
         status: true,
         message: "success",
         data: profile,
      });
   } catch (error) {
      const err = error as unknown as Error;
      console.log(err);

      res.status(500).json({
         status: false,
         message: err.message,
      });
   }
};

export const getProfileById = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;

      const profile = await profileServices.getProfile(+id);

      res.json({
         status: true,
         message: "success",
         data: profile,
      });
   } catch (error) {
      const err = error as unknown as Error;
      console.log(err);

      res.status(500).json({
         status: false,
         message: err.message,
      });
   }
};