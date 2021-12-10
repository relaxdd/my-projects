import Home from "../publicPages/Home";
import ProfileN from "../publicPages/ProfileN";
import RedirectProfile from "../privatePages/RedirectProfile";
import { USER_PATH } from "./pathRoutes";
import IRoute from "../types/IRoute";

const publicRoutes: IRoute[] = [
  {
    path: "/",
    component: Home,
    exact: true,
    title: "Главная страница",
  },
  {
    path: USER_PATH,
    component: RedirectProfile,
    exact: true,
    title: "Перенаправление на страницу пользователя",
  },
  {
    path: USER_PATH + "/:username",
    component: ProfileN,
    exact: false,
    title: "Профиль",
  },
];

export default publicRoutes;
