import { UserReducer } from './reducers/UserSlice';
import { PostReducer } from './reducers/PostSlice';
import { UserInfoReducer } from './reducers/UserInfoSlice';

import {
  configureStore,
  combineReducers,
  // getDefaultMiddleware,
} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  UserInfoReducer,
  UserReducer,
  PostReducer
  // rtk-query ---
  // [UserService.reducerPath]: UserService.reducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    // rtk-query ---
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().concat(UserService.middleware),
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
