import { Router } from "express";
import authentication from "../middleware/authentication";
import uploadMiddleware from "../middleware/upload";
import { createThread, getThread, getThreads, getReplies, deleteThread, getUserThreads} from "../controller/thread";
import cloudinary from "../lib/cloudinary";
const threadRouter = Router();
cloudinary.config();

threadRouter.post(
    "/thread",
    authentication,
    uploadMiddleware(),
    createThread
 );
 threadRouter.get("/threads", getThreads);
 threadRouter.get("/thread/:id", getThread);
 threadRouter.get('/thread', authentication, getUserThreads)
 threadRouter.get("/replies/:id", authentication, getReplies);
 threadRouter.delete("/thread/:id", authentication, deleteThread);
 
 export default threadRouter;

