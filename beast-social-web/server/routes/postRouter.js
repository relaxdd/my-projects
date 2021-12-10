import { Router } from "express";
import PostController from "../controllers/PostController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const postRouter = new Router();

postRouter.get("/", PostController.getAllByUsername);
postRouter.post("/feeds", authMiddleware, PostController.getAllFeeds);
postRouter.post("/create", authMiddleware, PostController.create);
postRouter.post("/delete", authMiddleware, PostController.delete);
postRouter.post("/change/like", authMiddleware, PostController.setLike);
postRouter.post("/fixpost", authMiddleware, PostController.fixPost);
postRouter.get("/:id", authMiddleware, PostController.getOne);

export default postRouter;
