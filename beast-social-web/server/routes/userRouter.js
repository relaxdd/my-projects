import { Router } from "express";
import UserController from "../controllers/UserController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const userRouter = new Router();

userRouter.get("/", authMiddleware, UserController.getUsers);
userRouter.get("/:username", UserController.getOneUserInfo);
userRouter.post("/userinfo", UserController.getOneUserInfoById);

export default userRouter;
