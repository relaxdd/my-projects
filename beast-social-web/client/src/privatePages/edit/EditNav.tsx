import React from "react";
import { NavLink } from "react-router-dom";
import { EDIT_ENUM } from "../../router/pathRoutes";
import css from "../../assets/scss/modules/Edit.module.scss";

interface navLinksType {
  name: string;
  to: string;
}

const navLinks: navLinksType[] = [
  {
    name: "Основное",
    to: EDIT_ENUM.PRIMARY,
  },
  {
    name: "Доступ к аккаунту",
    to: EDIT_ENUM.ACCESS,
  },
];

const EditNav = () => {
  return (
    <div className={`${css.editWrapper} ${css.editNavWrapper}`}>
      <nav className={css.editNavList}>
        {navLinks.map((link, key) => (
          <NavLink
            to={link.to}
            className={css.editNavItem}
            activeClassName={css.editNavItem__active}
            key={key}
          >
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default EditNav;
