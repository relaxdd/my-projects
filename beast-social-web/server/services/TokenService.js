import jwt from "jsonwebtoken";
import TokenModel from "../models/TokenModel.js";

class TokenService {
  generateTokens = async (payload) => {
    const accessToken = await jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
      expiresIn: "30m",
    });

    const refreshToken = await jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  };

  validateAccessToken = (token) => {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_KEY);
      return userData;
    } catch (e) {
      return null;
    }
  };

  validateRefreshToken = (token) => {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_KEY);
      return userData;
    } catch (e) {
      return null;
    }
  };

  saveToken = async (userId, refreshToken) => {
    const tokenData = await TokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await TokenModel.create({ user: userId, refreshToken });

    return token;
  };

  removeToken = async (refreshToken) => {
    const tokenData = await TokenModel.deleteOne({ refreshToken });
    return tokenData;
  };

  findToken = async (refreshToken) => {
    const tokenData = await TokenModel.findOne({ refreshToken });
    return tokenData;
  };
}

export default new TokenService();
