import { ResError } from "./UserService";
import { AxiosError } from "axios";
import $api from "../http";
import IFriend from "../types/IFriend";

class FriendsService {
  getMyFriends = async (userId: string) => {
    try {
      const res = await $api.post<IFriend[]>("/user/friends", { userId });
      return res.data;
    } catch (e) {
      const err = e as AxiosError<ResError>;
      console.error(err.response?.data?.message ?? err.response?.data);
    }
  };

  addNewFriend = async (fromId: string, toUsername: string) => {
    try {
      const res = await $api.post<string>("/user/friends/add", {
        fromId,
        toUsername,
      });
      return res.data;
    } catch (e) {
      const err = e as AxiosError<ResError>;
      console.error(err.response?.data?.message ?? err.response?.data);
    }
  };

  acceptFriendsRequest = async (fromId: string, toUsername: string) => {
    try {
      const res = await $api.post<string>("/user/friends/confirm", {
        fromId,
        toUsername,
      });

      return res.data;
    } catch (e) {
      const err = e as AxiosError<ResError>;
      console.error(err.response?.data?.message ?? err.response?.data);
    }
  };

  removeFromFriends = async (fromId: string, toUsername: string) => {
    try {
      const res = await $api.post<string>("/user/friends/remove", {
        fromId,
        toUsername,
      });

      return res.data;
    } catch (e) {
      const err = e as AxiosError<ResError>;
      console.error(err.response?.data?.message ?? err.response?.data);
    }
  };

  cancelFriendRequest = async (fromId: string, toUsername: string) => {
    try {
      const res = await $api.post<string>("/user/friends/cancel", {
        fromId,
        toUsername,
      });

      return res.data;
    } catch (e) {
      const err = e as AxiosError<ResError>;
      console.error(err.response?.data?.message ?? err.response?.data);
    }
  };

  checkTypeRelation = async (fromId: string, toUsername: string) => {
    try {
      const res = await $api.post<string>("/user/friends/check", {
        fromId,
        toUsername,
      });

      return res.data;
    } catch (e) {
      const err = e as AxiosError<ResError>;
      console.error(err.response?.data?.message ?? err.response?.data);
    }
  };
}

export default new FriendsService();
