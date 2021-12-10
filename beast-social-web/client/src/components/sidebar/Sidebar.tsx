import { NavLink } from "react-router-dom";
import { USER_PATH } from "../../router/pathRoutes";
import NavItem from "../sidebar/NavItem";
import sidebarMap from "./sidebarMap";
import { INavItem } from "../../types";
import { useAppSelector } from "../../hooks/redux";
import Loader from "../ui/Loader";

const Sidebar = () => {
  const { isUserLoading, user } = useAppSelector((store) => store.UserReducer);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  if (isUserLoading) {
    return <Loader />;
  }

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <NavLink
          to={`${USER_PATH}/${user?.username}`}
          className="sidebar-nav__item"
        >
          <img
            src={`${SERVER_URL}/images/2021/10/user.png`}
            alt="user-icon"
            className="sidebar-nav__item-img"
          />
          <span className="sidebar-nav__item-text">Мой профиль</span>
        </NavLink>

        {sidebarMap.map((navItem: INavItem, ind) => (
          <NavItem navItem={navItem} key={ind} />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
