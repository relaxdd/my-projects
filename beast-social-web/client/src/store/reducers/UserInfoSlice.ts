import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import $api from "../../http";
import { ResError } from "../../services/UserService";
import IUserInfo from "./../../types/IUserInfo";

export interface UserInfoState {
  userInfo: IUserInfo | null;
  isUserInfoLoading: boolean;
  isUserInfoError: boolean;
  userInfoError: string;
  errorNotification: string;
}

export const initialState: UserInfoState = {
  userInfo: null,
  isUserInfoLoading: false,
  isUserInfoError: false,
  userInfoError: "",
  errorNotification: "",
};

// fetchUserInfoByName
export const fetchUserInfoByName = createAsyncThunk(
  "userInfo/fetchUserInfoByName",
  async (username: string, { rejectWithValue }) => {
    try {
      const res = await $api.get<IUserInfo>(`/users/${username}`);
      return res.data;
    } catch (e) {
      const err = e as AxiosError<ResError>;
      return rejectWithValue({
        message: err.message,
        status: err.response?.status,
      });
    }
  }
);

// fetchUserInfoById
export const fetchUserInfoById = createAsyncThunk(
  "userInfo/fetchUserInfoById",
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await $api.post<IUserInfo>("users/userinfo", { userId });
      return res.data;
    } catch (e) {
      const err = e as AxiosError<ResError>;
      return rejectWithValue(err.message);
    }
  }
);

export interface formValuesType {
  firstName: string | null;
  lastName: string | null;
  dateBirth: string | null;
  city: string | null;
  phone: string | null;
}

export interface updateDataProps {
  userId: string;
  formValues: formValuesType;
}

// update UserInfo
export const updateUserInfo = createAsyncThunk(
  "userInfo/updateUserInfo",
  async (updateData: updateDataProps, thunkAPI) => {
    try {
      const res = await $api.post<IUserInfo>("/user/update/info", updateData);
      return res.data;
    } catch (e) {
      const err = e as AxiosError<ResError>;
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Update User Avatar
export const updateUserAvatar = createAsyncThunk(
  "userInfo/updateUserAvatar",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await $api.post<string>("/user/update/avatar", formData);
      return res.data;
    } catch (e) {
      const err = e as AxiosError<ResError>;
      return rejectWithValue(err.message);
    }
  }
);

// Update User Avatar
export const deleteUserAvatar = createAsyncThunk(
  "userInfo/deleteUserAvatar",
  async (userId: string, { rejectWithValue }) => {
    try {
      await $api.post<IUserInfo>("/user/delete/avatar", { userId });
    } catch (e) {
      const err = e as AxiosError<ResError>;
      return rejectWithValue(err.message);
    }
  }
);

export interface fetchUserInfoByNameReject {
  message: string;
  status: number;
}

export const UserInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    removeNotice(state) {
      state.errorNotification = "";
    },
  },
  extraReducers: {
    // FindByName
    [fetchUserInfoByName.pending.type]: (state) => {
      state.isUserInfoLoading = true;
    },
    [fetchUserInfoByName.fulfilled.type]: (
      state,
      action: PayloadAction<IUserInfo>
    ) => {
      state.isUserInfoLoading = false;
      state.userInfoError = "";
      state.userInfo = action.payload;
    },
    [fetchUserInfoByName.rejected.type]: (
      state,
      action: PayloadAction<fetchUserInfoByNameReject>
    ) => {
      state.isUserInfoLoading = false;
      state.isUserInfoError = true;
      state.userInfoError = action.payload.message;
    },
    // FindById
    [fetchUserInfoById.pending.type]: (state) => {
      state.isUserInfoLoading = true;
    },
    [fetchUserInfoById.fulfilled.type]: (
      state,
      action: PayloadAction<IUserInfo>
    ) => {
      state.isUserInfoLoading = false;
      state.userInfoError = "";
      state.userInfo = action.payload;
    },
    [fetchUserInfoById.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isUserInfoLoading = false;
      state.isUserInfoError = true;
      state.userInfoError = action.payload;
    },
    // update UserInfo Data
    [updateUserInfo.fulfilled.type]: (
      state,
      action: PayloadAction<IUserInfo>
    ) => {
      state.userInfo = action.payload;
      state.userInfoError = "";
    },
    [updateUserInfo.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isUserInfoLoading = false;
      state.isUserInfoError = true;
      state.userInfoError = action.payload;
    },
    // Update Avatar
    [updateUserAvatar.fulfilled.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      const userInfo = state.userInfo as IUserInfo;
      userInfo.avatar = action.payload;
    },
    [updateUserAvatar.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.errorNotification = action.payload;
    },
    // Delete Avatar
    [deleteUserAvatar.fulfilled.type]: (state) => {
      const userInfo = state.userInfo as IUserInfo;
      userInfo.avatar = null;
    },
    [deleteUserAvatar.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.errorNotification = action.payload;
    },
  },
});

export const UserInfoReducer = UserInfoSlice.reducer;
// Обычные reducer's
export const { removeNotice } = UserInfoSlice.actions;
