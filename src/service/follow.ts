import db from "../db";

export const follow = async (followerId: number, followingId: number) => {
   const existingFollow = await db.follow.findFirst({
      where: {
         followerId,
         followingId,
      },
   });

   if (existingFollow) {
      await db.follow.deleteMany({
         where: {
            followerId,
            followingId,
         },
      });

      return "unfollowing successful";
   }

   const follow = await db.follow.create({
      data: {
         followerId,
         followingId,
      },
   });

   return "following successful";
};

export const getFollowingUsers = async (userId: number) => {
   try {
      const followingUsers = await db.follow.findMany({
         where: {
            followerId: userId,
         },
         include: {
            following: {
               include: {
                  profile: {
                     select: {
                        avatar: true,
                        bio: true,
                     }
                  }
               }
            }
         },
      });
      
      return followingUsers.map((follow) => follow.following)
   }
      catch (error) {
         throw new Error("Failed to get following users");
   }
}

export const getFollowerUsers = async (userId: number) => {
   try {
      const followerUsers = await db.follow.findMany({
         where: {
            followingId: userId,
         },
         include: {
            follower: {
               include: {
                  profile: {
                     select: {
                        avatar: true,
                        bio: true,
                     },
                  },
                  follower: true,
               }
            }
         },
      })
      return followerUsers.map((follow) => follow.follower)
   } catch (error) {
      throw new Error("Failed to get following users");
   }
}

export const getCurrentFollow = async (followerId: number, followingId: number) => {
   return await db.follow.findFirst({
      where: {
         followerId,
         followingId,
      },
   });
};