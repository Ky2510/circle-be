import { Request, Response } from "express";
import prisma from "../db";
import * as followService from "../service/follow";

export const follow = async (req: Request, res: Response) => {
   try {
      console.log(req.body);
      const { followingId } = req.body;
      const followerId = res.locals.user;

      const follow = await followService.follow(followerId, followingId);

      res.json({
         success: true,
         message: follow,
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         success: false,
         error: error,
      });
   }
};

export const getFollowers = async (req: Request, res: Response) => {
   try {
      const { followingId } = req.params;

      const followers = await prisma.follow.findMany({
         where: {
            followingId: +followingId,
         },
         select: {
            follower: {
               select: {
                  id: true,
                  fullname: true,
                  username: true,
                  profile: {
                     select: {
                        avatar: true,
                     },
                  },
               },
            },
         },
      });

      res.json({
         success: true,
         message: "success",
         data: followers,
      });
   } catch (error) {
      const err = error as Error;
      console.log(err);
      res.status(500).json({
         success: false,
         error: error,
      });
   }
};

export const getFollowings = async (req: Request, res: Response) => {
   try {
      const { followerId } = req.params;
      console.log("Follower ID:", followerId);

      const followings = await prisma.follow.findMany({
         where: {
            followerId: +followerId,
         },
         include: {
            following: {
               select: {
                  id: true,
                  fullname: true,
                  username: true,
                  profile: {
                     select: {
                        avatar: true,
                     },
                  },
               },
            },
         },
      });

      res.json({
         success: true,
         message: "success",
         data: followings,
      });
   } catch (error) {
      const err = error as Error;
      console.log(err);

      res.status(500).json({
         success: false,
         error: err.message,
      });
   }
};

export const getFollowingUsers = async (req: Request, res: Response) => {
   try {
      const followerId= res.locals.user;
      const followingUsers = await followService.getFollowingUsers(followerId);
      res.json({
         status: true,
         message: "success",
         data: followingUsers,
      })
   } catch (error) {
      const err = error as Error;
      console.log(err);
      res.status(500).json({
         status: false,
         message: err.message,
      });
   }
}

export const getFollowerUsers = async (req: Request, res: Response) => {
   try {
      const followingId = res.locals.user;
      const followerUsers = await followService.getFollowerUsers(followingId);
      res.json({
         status: true,
         message: "success",
         data: followerUsers,
      })
   } catch (error) {
      const err = error as Error;
      console.log(err);
      res.status(500).json({
         status: false,
         message: err.message,
      });
   }
}

export const getCurrentFollow = async (req: Request, res: Response) => {
   try {
      const { followerId } = req.params;
      const followingId = res.locals.user;
      const follow = await followService.getCurrentFollow(+followerId, +followingId);

      res.json({
         status: true,
         message: "success",
         data: {
            follow,
         },
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