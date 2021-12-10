import FriendsService from "../services/FriendsService.js";
import UserService from "../services/UserService.js";

class UserController {
  getUsers = async (req, res, next) => {
    try {
      const users = await UserService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  };

  getOneUserInfo = async (req, res, next) => {
    try {
      const userInfo = await UserService.findOneUserInfo(req.params.username);
      return res.json(userInfo);
    } catch (e) {
      next(e);
    }
  };

  getOneUserInfoById = async (req, res, next) => {
    try {
      const userInfo = await UserService.findOneUserInfoById(req.body.userId);
      return res.json(userInfo);
    } catch (e) {
      next(e);
    }
  };

  updateUserAvatar = async (req, res, next) => {
    try {
      const { userId } = req.body;
      const { image } = req.files;

      const newAvatar = await UserService.updateUserAvatar(userId, image);

      return res.json(newAvatar);
      // return res.json(newAvatar);
    } catch (e) {
      next(e);
    }
  };

  deleteUserAvatar = async (req, res, next) => {
    try {
      const response = await UserService.deleteUserAvatar(req.body.userId);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  };

  findFriendsById = async (req, res, next) => {
    try {
      const friends = await UserService.findFriendsById(req.body.userId);
      return res.json(friends);
    } catch (e) {
      next(e);
    }
  };

  addNewFriend = async (req, res, next) => {
    try {
      const newFriend = await FriendsService.addNewFriend(req.body);
      return res.json(newFriend);
    } catch (e) {
      next(e);
    }
  };

  acceptFriendsRequest = async (req, res, next) => {
    try {
      const typeRelation = await FriendsService.acceptFriendsRequest(req.body);
      return res.json(typeRelation);
    } catch (e) {
      next(e);
    }
  };

  removeFromFriends = async (req, res, next) => {
    try {
      const typeRelation = await FriendsService.removeFromFriends(req.body);
      return res.json(typeRelation);
    } catch (e) {
      next(e);
    }
  };

  cancelFriendRequest = async (req, res, next) => {
    try {
      const typeRelation = await FriendsService.cancelFriendRequest(req.body);
      return res.json(typeRelation);
    } catch (e) {
      next(e);
    }
  };

  checkTypeRelation = async (req, res, next) => {
    try {
      const typeRelation = await FriendsService.checkTypeRelation(req.body);
      return res.json(typeRelation);
    } catch (e) {
      next(e);
    }
  };

  editUserInfo = async (req, res, next) => {
    const { userId, formValues } = req.body;
    try {
      const updatedUserInfo = await UserService.editUserInfo(
        userId,
        formValues
      );

      return res.json(updatedUserInfo);
    } catch (e) {
      next(e);
    }
  };
}

export default new UserController();
