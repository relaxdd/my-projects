import {
  createAsyncThunk,
  createSlice,
  Draft,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ResError } from "./../../types";
import { IUserDto } from "./../../types/IUser";
import $api from "../../http";

const SERVER = process.env?.REACT_APP_SERVER_URL ?? "http://localhost:5000";

export interface UserState {
  user: IUserDto | null;
  isAuth: boolean;
  selfProfile: boolean;
  selfChecked: boolean;
  isUserLoading: boolean;
  errorMessage: string;
  // bottom notice message
  noticeVisible: boolean;
  noticeMessage: string;
}

export const initialState: UserState = {
  user: null,
  isAuth: false,
  selfProfile: false,
  selfChecked: false,
  isUserLoading: true,
  errorMessage: "",
  // bottom notice message
  noticeVisible: false,
  noticeMessage: "",
};

export interface checkAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUserDto;
}

// Auth exceptions
function exception(e: AxiosError<ResError>) {
  if (!e.response) return e;

  if (e.response.status !== 500) {
    const err = e?.response?.data;

    const checkTypeError = err.errors.map((item, i) => {
      if (typeof e?.response?.data.errors[0] !== "string") {
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
}

// Update User Avatar
export const checkUserAuth = createAsyncThunk(
  "user/checkUserAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<checkAuthResponse>(
        `${SERVER}/api/auth/refresh`,
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (e) {
      const err = e as AxiosError<ResError>;
      return rejectWithValue(err.message);
    }
  }
);

export interface loginUserType {
  username: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginData: loginUserType, { rejectWithValue }) => {
    try {
      const res = await $api.post<checkAuthResponse>("/auth/login", loginData);
      return res.data;
    } catch (e) {
      const err = e as AxiosError<ResError>;
      return rejectWithValue(exception(err));
    }
  }
);

export interface regDataType {
  username: string;
  email: string;
  password: string;
  confirm: string;
}

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (regData: regDataType, { rejectWithValue }) => {
    try {
      const res = await $api.post<checkAuthResponse>(
        "/auth/registration",
        regData
      );
      return res.data;
    } catch (e) {
      const err = e as AxiosError<ResError>;
      return rejectWithValue(exception(err));
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await $api.post("/auth/logout");
      return res;
    } catch (e) {
      const err = e as AxiosError<ResError>;
      return rejectWithValue(exception(err));
    }
  }
);

// Helpers function pushStore
function pushStore(state: Draft<UserState>, data: checkAuthResponse) {
  localStorage.setItem("accessToken", data.accessToken);
  state.isAuth = true;
  state.user = data.user;
  state.isUserLoading = false;
}

function pending(state: Draft<UserState>) {
  state.errorMessage = "";
  state.isUserLoading = true;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function rejected(state: Draft<UserState>, message: string) {
  state.isUserLoading = false;
  state.errorMessage = message;
}

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUserLoading(state) {
      state.isUserLoading = false;
    },
    // Notice Messages
    showNoticeMessage(state, action: PayloadAction<string>) {
      state.noticeMessage = action.payload;
      state.noticeVisible = true;
    },
    hideNoticeMessage(state) {
      state.noticeMessage = "";
      state.noticeVisible = false;
    },
    // selfProfile
    setSelfProfile(state, action: PayloadAction<boolean>) {
      state.selfProfile = action.payload;
      state.selfChecked = true;
    },
  },
  extraReducers: (builder) => {
    // Check User Auth
    builder.addCase(
      checkUserAuth.fulfilled.type,
      (state, action: PayloadAction<checkAuthResponse>) => {
        pushStore(state, action.payload);
      }
    );
    builder.addCase(checkUserAuth.rejected.type, (state) => {
      state.isUserLoading = false;
    });
    // Login User
    builder.addCase(loginUser.pending.type, (state) => {
      pending(state);
    });
    builder.addCase(
      loginUser.fulfilled.type,
      (state, action: PayloadAction<checkAuthResponse>) => {
        pushStore(state, action.payload);
      }
    );
    builder.addCase(
      loginUser.rejected.type,
      (state, action: PayloadAction<string>) => {
        rejected(state, action.payload);
      }
    );
    // Register User
    builder.addCase(registerUser.pending.type, (state) => {
      pending(state);
    });
    builder.addCase(
      registerUser.fulfilled.type,
      (state, action: PayloadAction<checkAuthResponse>) => {
        pushStore(state, action.payload);
      }
    );
    builder.addCase(
      registerUser.rejected.type,
      (state, action: PayloadAction<string>) => {
        rejected(state, action.payload);
      }
    );
    // Logout User
    builder.addCase(logoutUser.pending.type, (state) => {
      state.isUserLoading = true;
    });
    builder.addCase(logoutUser.fulfilled.type, (state) => {
      localStorage.removeItem("accessToken");
      state.isAuth = false;
      state.user = null;
      state.isUserLoading = false;
    });
    builder.addCase(
      logoutUser.rejected.type,
      (state, action: PayloadAction<any>) => {
        state.isUserLoading = false;
        state.errorMessage = "Произошла какая то серверная ошибка!";
        console.log(action.payload);
      }
    );
  },
});

// Асинхронные reducer's
export const UserReducer = UserSlice.reducer;

// Обычные reducer's
export const {
  removeUserLoading,
  showNoticeMessage,
  hideNoticeMessage,
  setSelfProfile,
} = UserSlice.actions;
