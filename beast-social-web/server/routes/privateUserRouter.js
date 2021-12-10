import { Router } from "express";
import UserController from "../controllers/UserController.js";

const privateUserRouter = new Router();

// avatar
privateUserRouter.post("/update/avatar", UserController.updateUserAvatar);
privateUserRouter.post("/delete/avatar", UserController.deleteUserAvatar);
privateUserRouter.post("/update/info", UserController.editUserInfo);
// friends
privateUserRouter.post("/friends", UserController.findFriendsById);
privateUserRouter.post("/friends/add", UserController.addNewFriend);
privateUserRouter.post("/friends/confirm", UserController.acceptFriendsRequest);
privateUserRouter.post("/friends/remove", UserController.removeFromFriends);
privateUserRouter.post("/friends/cancel", UserController.cancelFriendRequest);
privateUserRouter.post("/friends/check", UserController.checkTypeRelation);

export default privateUserRouter;
