import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import IUserInfo from "../../types/IUserInfo";

export const UserService = createApi({
  reducerPath: "UserService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  endpoints: (build) => ({
    getUserInfo: build.query<IUserInfo, string>({
      query: (username: string) => ({
        url: "/users/" + username,
      }),
    }),
  }),
});

export const { useGetUserInfoQuery } = UserService;
