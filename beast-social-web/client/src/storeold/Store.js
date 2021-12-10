import axios from "axios";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";

class Store {
  user = null;
  userInfo = null;
  weAsGuest = null;
  isAuth = false;
  isLoading = true;
  noticeVisible = false;
  noticeMessage = "";

  constructor() {
    makeAutoObservable(this);
  }

  setNoticeMessage = (text) => {
    this.noticeMessage = text;
  };

  setNoticeVisible = (bool) => {
    this.noticeVisible = bool;
  };

  getUser = () => this.user;

  setUser = (user) => {
    this.user = user;
  };

  setUserInfo = (userInfo) => {
    this.userInfo = userInfo;
  };

  setWeAsGuest = (userInfo) => {
    this.weAsGuest = userInfo;
  };

  setLoading = (bool) => {
    this.isLoading = bool;
  };

  pushStore = (res) => {
    localStorage.setItem("accessToken", res.data.accessToken);
    this.setAuth(true);
    this.setUser(res.data.user);
  };

  exception = (e) => {
    // console.log(e.response.data.errors);
    if (e.response.status !== 500) {
      const err = e?.response?.data;

      const checkTypeError = err.errors.map((item, i) => {
        if (typeof e.response.data.errors[0] !== "string") {
          return i + 1 !== err.errors.length
            ? `[${item.param}: ${item.msg}], `
            : `[${item.param}: ${item.msg}]`;
        } else {
          return i + 1 !== err.errors.length ? `${item}, ` : `${item}`;
        }
      });

      // Обработчик ошибок валидации middleware
      const validateErrors =
        typeof err?.errors === "string" ? err : checkTypeError;

      const error = !err?.errors.length
        ? err.message
        : `${err.message}: ${validateErrors}`;

      return error;
    } else {
      return e.response.data.message;
    }
  };

  login = async (formData, callback) => {
    try {
      const res = await AuthService.login(formData);
      callback();
      this.pushStore(res);
    } catch (e) {
      const error = this.exception(e);
      throw new Error(error);
    }
  };

  register = async (formData, callback) => {
    try {
      const res = await AuthService.register(formData);
      callback();
      this.pushStore(res);
    } catch (e) {
      console.log(e.response);
      const error = this.exception(e);
      throw new Error(error);
    }
  };

  logout = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem("accessToken");
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      throw new Error(e);
    }
  };

  setAuth = (bool) => {
    this.isAuth = bool;
  };

  checkAuth = async () => {
    this.setLoading(true);

    try {
      const res = await axios.get("http://localhost:5000/api/auth/refresh", {
        withCredentials: true,
      });
      this.pushStore(res);
    } catch (e) {
      throw new Error(e?.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  };
}

export default Store;
