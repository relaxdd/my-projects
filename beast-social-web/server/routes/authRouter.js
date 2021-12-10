import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import { body } from "express-validator";
import authMiddleware from "../middlewares/authMiddleware.js";

const authRouter = new Router();

authRouter.get("/", (_, res) => res.redirect(process.env.CLIENT_URL));

authRouter.post(
  "/registration",
  body("username").isLength({ min: 3 }),
  body("email").isEmail(),
  body("password").isLength({ min: 4 }),
  body("confirm").isLength({ min: 4 }),
  AuthController.registration
);

authRouter.post(
  "/login",
  body("username").isLength({ min: 3 }),
  body("password").isLength({ min: 4 }),
  AuthController.login
);

authRouter.post(
  "/change/password",
  authMiddleware,
  body("newPass").isLength({ min: 4 }),
  body("confirm").isLength({ min: 4 }),
  AuthController.changePassword
);

authRouter.post("/logout", AuthController.logout);
authRouter.get("/activate/:link", AuthController.activate);
authRouter.get("/refresh", AuthController.refresh);

export default authRouter;
