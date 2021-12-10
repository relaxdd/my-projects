import AuthService from "../services/AuthService.js";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/ApiError.js";

class AuthController {
  registration = async (req, res, next) => {
    try {
      const errs = validationResult(req);

      if (!errs.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации данных", errs.array())
        );
      }

      const userData = await AuthService.registration(req.body);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // secure: true | Если включен https
      });

      return res.status(201).json(userData);
    } catch (e) {
      next(e);
    }
  };

  login = async (req, res, next) => {
    try {
      const errs = validationResult(req);

      if (!errs.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации данных", errs.array())
        );
      }

      const userData = await AuthService.login(req.body);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // secure: true | Если включен https
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  };

  logout = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const token = await AuthService.logout(refreshToken);

      res.clearCookie("refreshToken");

      return res.json(token);
    } catch (e) {
      next(e);
    }
  };

  activate = async (req, res, next) => {
    try {
      await AuthService.activate(req.params.link);
      res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  };

  refresh = async (req, res, next) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      const userData = await AuthService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // secure: true | Если включен https
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  };

  changePassword = async (req, res, next) => {
    try {
      const status = await AuthService.changePassword(req.body);
      return res.json(status);
    } catch (e) {
      next(e);
    }
  };
}

export default new AuthController();
