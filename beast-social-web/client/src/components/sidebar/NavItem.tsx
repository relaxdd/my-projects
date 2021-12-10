import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { INavItem } from "../../types";

interface NavItemProps {
  navItem: INavItem
}

const NavItem: FC<NavItemProps> = ({ navItem }) => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  return (
    <NavLink to={navItem.path} className="sidebar-nav__item">
      <img
        src={`${SERVER_URL}/images${navItem.image}`}
        alt="nav-link-icon"
        className="sidebar-nav__item-img"
      />
      <span className="sidebar-nav__item-text">{navItem.name}</span>
    </NavLink>
  );
};

export default NavItem;
