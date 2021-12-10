import bcrypt from "bcrypt";
import { v4 } from "uuid";
import UserDto from "../dtos/UserDto.js";
import UserModel from "../models/UserModel.js";
import UserInfoModel from "../models/UserInfoModel.js";
import FriendsModel from "../models/FriendsModel.js";
import MailService from "./MailService.js";
import TokenService from "./TokenService.js";
import ApiError from "../exceptions/ApiError.js";
import CustomValidator from "../validators/CustomValidator.js";

class AuthService {
  registration = async ({ username, email, password, confirm }) => {
    const err = CustomValidator.password(password, confirm);

    if (err.length) {
      throw ApiError.BadRequest("При валидации пароля произошла ошибка", err);
    }

    const candidate = await UserModel.findOne({ username });

    if (candidate) {
      throw ApiError.BadRequest("Пользователь с таким username уже существует");
    }

    const candidate2 = await UserModel.findOne({ email });

    if (candidate2) {
      throw ApiError.BadRequest("Пользователь с таким email уже существует");
    }

    const hashPassword = await bcrypt.hash(password, 4);
    const activationLink = v4();

    const user = await UserModel.create({
      username,
      email,
      password: hashPassword,
      activationLink,
    });

    console.log(user._id);

    await UserInfoModel.create({
      userId: user._id.toHexString(),
      avatar: null,
      firstName: null,
      lastName: null,
      phone: null,
      dateBirth: null,
      city: null,
    });

    await FriendsModel.create({
      userId: user._id.toHexString(),
      friendsList: [],
    });

    try {
      MailService.sendActivationLink(
        email,
        `${process.env.API_URL}/api/auth/activate/${activationLink}`
      );
    } catch (e) {
      throw ApiError.Internal(e.message);
    }

    const userDto = new UserDto(user);
    const tokens = await TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  };

  login = async ({ username, password }) => {
    const user = await UserModel.findOne({ username });

    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким username не найден");
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) throw ApiError.BadRequest("Введен неверный пароль!");

    // if (!user.isActivated)
    //   throw ApiError.BadRequest("Подтвердите свою учетную запись!");

    const userDto = new UserDto(user);
    const tokens = await TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  };

  logout = async (refreshToken) => {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  };

  activate = async (activationLink) => {
    if (!activationLink)
      throw ApiError.BadRequest("Нету ссылки для активации!");

    const user = await UserModel.findOne({ activationLink });

    if (!user) throw ApiError.BadRequest("Неккоректная ссылка активации");
    if (user.isActivated)
      throw ApiError.BadRequest("Вы уже подтвердили свою почту!");

    user.isActivated = true;
    await user.save();
  };

  refresh = async (refreshToken) => {
    if (!refreshToken) throw ApiError.UnauthorizedError();

    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await TokenService.findToken(refreshToken);

    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = await TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  };

  changePassword = async ({ userId, oldPass, newPass, confirm }) => {
    if (!userId) throw ApiError.BadRequest();
    const user = await UserModel.findById(userId);

    const isPassEquals = await bcrypt.compare(oldPass, user.password);
    if (!isPassEquals) throw ApiError.BadRequest("Введен неверный пароль!");

    const err = CustomValidator.password(newPass, confirm);
    if (err.length) {
      throw ApiError.BadRequest("При валидации пароля произошла ошибка", err);
    }

    const hashPassword = await bcrypt.hash(newPass, 4);
    user.password = hashPassword;

    await user.save();
    this.logout();

    return true;
  };
}

export default new AuthService();
