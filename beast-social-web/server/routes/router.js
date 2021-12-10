import { Router } from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import privateUserRouter from "./privateUserRouter.js";
import postRouter from "./postRouter.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = new Router();
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/user", authMiddleware, privateUserRouter);
router.use("/posts", postRouter);

export default router;
