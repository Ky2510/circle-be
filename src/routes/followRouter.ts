import { Router } from "express";
import authentication from "../middleware/authentication";
import { follow, getCurrentFollow, getFollowerUsers, getFollowers, getFollowingUsers, getFollowings } from "../controller/follow";
const followerRouter = Router();

followerRouter.post("/follow", authentication, follow);
followerRouter.get("/follower/:followingId", authentication, getFollowers);
followerRouter.get("/following/:followerId", authentication, getFollowings);
followerRouter.get("/following", authentication, getFollowingUsers);
followerRouter.get("/follower", authentication, getFollowerUsers);
followerRouter.get("/follow/:followerId", authentication, getCurrentFollow)

export default followerRouter;