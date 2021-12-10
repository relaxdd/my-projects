import $api from "../http";
import { AxiosError } from "axios";
import IUserInfo from "../types/IUserInfo";

export interface ResError {
  readonly message?: string;
  readonly errors: any[];
}

class UserService {
  getUserInfo = async (username: string) => {
    try {
      const res = await $api.get<IUserInfo>("/users/" + username);
      return res.data;
    } catch (e) {
      const err = e as AxiosError<ResError>;
      console.error(err.response?.data?.message ?? err.response?.data);
    }
  };

  // updateAvatar = async (formData: FormData) => {
  //   try {
  //     const res = await $api.post<string>("/user/update/avatar", formData);
  //     return res.data;
  //   } catch (e) {
  //     const err = e as AxiosError<ResError>;
  //     console.error(err.response?.data?.message ?? err.response?.data);
  //   }
  // };

  // deleteAvatar = async (userId: string) => {
  //   try {
  //     await $api.post<IUserInfo>("/user/delete/avatar", { userId });
  //   } catch (e) {
  //     const err = e as AxiosError<ResError>;
  //     console.error(err.response?.data?.message ?? err.response?.data);
  //   }
  // };
}

export default new UserService();
