import UserDto from "../dtos/UserDto.js";
import UserInfoModel from "../models/UserInfoModel.js";
import UserModel from "../models/UserModel.js";
import { DateTime } from "luxon";
import FriendsModel from "../models/FriendsModel.js";
import ApiError from "../exceptions/ApiError.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createDirectories(pathname, cb) {
  const __dirname = path.resolve();

  try {
    // Remove leading directory markers, and remove ending /file-name.extension
    pathname = pathname.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, "");
    await fs.mkdirSync(path.resolve(__dirname, pathname), { recursive: true });
  } catch (e) {
    console.error(e);
  }
}

class UserService {
  getAllUsers = async () => {
    const users = await UserModel.find();
    const userDtos = users.map((user) => new UserDto(user));

    return userDtos;
  };

  createUserInfo = async (userId, infoData) => {
    const userInfo = await UserInfoModel.create({
      userId,
      ...infoData,
    });

    return userInfo;
  };

  findOneUserInfo = async (username) => {
    const user = await UserModel.findOne({ username });

    if (!user) throw ApiError.NotFound();

    const userInfo = await UserInfoModel.findOne({
      userId: user._id.toHexString(),
    });

    return userInfo;
  };

  findOneUserInfoById = async (userId) => {
    const user = await UserModel.findOne({ userId });

    if (!user) throw ApiError.NotFound();

    const userInfo = await UserInfoModel.findOne({
      userId: user._id.toHexString(),
    });

    return userInfo;
  };

  updateUserAvatar = async (userId, image) => {
    const year = String(DateTime.local().year);
    const month = String(DateTime.local().month);
    const dir = path.join(__dirname, "..", "static", "images", year, month);

    await createDirectories(dir);

    image.mv(
      path.resolve(__dirname, "..", "static", "images", year, month, image.name)
    );

    const userInfo = await UserInfoModel.findOne({ userId });
    userInfo.avatar = `/${year}/${month}/${image.name}`;

    await userInfo.save();

    return userInfo.avatar;
  };

  deleteUserAvatar = async (userId) => {
    const userInfo = await UserInfoModel.findOne({ userId });
    userInfo.avatar = null;
    const res = await userInfo.save();

    return res;
  };

  // TODO: Перенести в friends сервис
  findFriendsById = async (userId) => {
    const friends = await FriendsModel.findOne({ userId });
    const friendsInfoList = [];

    async function fillFriendInfo(friend) {
      const user = await UserModel.findById(friend.userId);
      const userInfo = await UserInfoModel.findOne({ userId: friend.userId });

      return {
        userId: user._id,
        username: user.username,
        avatar: userInfo.avatar,
        fullName:
          userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : "Без имени",
      };
    }

    async function collectFriendsInfo(friendsList) {
      for (const friend of friendsList) {
        if (friend.typeRelation === "isFriends") {
          const friendInfo = await fillFriendInfo(friend);
          friendsInfoList.push(friendInfo);
        }
      }
    }

    await collectFriendsInfo(friends.friendsList);

    return friendsInfoList;
  };

  editUserInfo = async (userId, formData) => {
    const userInfo = await UserInfoModel.findOne({ userId });

    userInfo.firstName = formData?.firstName ?? null;
    userInfo.lastName = formData?.lastName ?? null;
    userInfo.phone = formData?.phone ?? null;
    userInfo.dateBirth = formData?.dateBirth ?? null;
    userInfo.city = formData?.city ?? null;
    userInfo.gender = "none";

    const updatedUserInfo = await userInfo.save();
    return updatedUserInfo;
  };
}

export default new UserService();
