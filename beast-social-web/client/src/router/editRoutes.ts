import { EDIT_ENUM } from "./pathRoutes";
import EditContacts from "../privatePages/edit/EditContacts";
import EditPrimary from "../privatePages/edit/EditPrimary";
import EditAccess from "../privatePages/edit/EditAccess";
import IRoute from "../types/IRoute";

const editRoutes: IRoute[] = [
  {
    path: EDIT_ENUM.PRIMARY,
    component: EditPrimary,
    exact: false,
    title: "Редактировать основную информацию",
  },
  {
    path: EDIT_ENUM.CONTACTS,
    component: EditContacts,
    exact: false,
    title: "Редактировать контакты",
  },
  {
    path: EDIT_ENUM.ACCESS,
    component: EditAccess,
    exact: false,
    title: "Редактировать доступ к аккаунту",
  },
];

export default editRoutes;
