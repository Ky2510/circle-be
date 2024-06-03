import { Router } from "express";
import authentication from "../middleware/authentication";
import { getLikes, createLike, getCurrentLike } from "../controller/like";
const likeRouter = Router();

likeRouter.get("/likes/:threadId", authentication, getLikes);
likeRouter.post("/like", authentication, createLike);  
likeRouter.get("/like/:threadId/", authentication, getCurrentLike);


export default likeRouter