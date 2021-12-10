import Edit from "../privatePages/Edit";
import Feed from "../privatePages/Feed";
import Friends from "../privatePages/Friends";
import Profile from "../privatePages/Profile";
import RedirectProfile from "../privatePages/RedirectProfile";
import {
  EDIT_PATH,
  FEED_PATH,
  FRIENDS_PATH,
  TRACKS_PATH,
  USER_PATH,
} from "./pathRoutes";
import Tracks from "../privatePages/Tracks";
import IRoute from "../types/IRoute";

const privateRoutes: IRoute[] = [
  {
    path: FEED_PATH,
    component: Feed,
    exact: false,
    title: "Новости",
  },
  {
    path: EDIT_PATH,
    component: Edit,
    exact: false,
    title: "Редактировать аккаунт",
  },
  {
    path: USER_PATH,
    component: RedirectProfile,
    exact: true,
    title: "Перенаправление на страницу пользователя",
  },
  {
    path: USER_PATH + "/:username",
    component: Profile,
    exact: true,
    title: "Профиль",
  },
  {
    path: FRIENDS_PATH,
    component: Friends,
    exact: false,
    title: "Друзья",
  },
  {
    path: TRACKS_PATH,
    component: Tracks,
    exact: false,
    title: "Песни",
  },
];

export default privateRoutes;
