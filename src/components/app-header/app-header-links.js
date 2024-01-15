import styles from "../app-header/app-header-links.module.css";
import { NavLink } from "react-router-dom";
import { cloneElement } from "react";
import PropTypes from "prop-types";

export default function AppHeaderLinks({ href, icon, title }) {
  return (
    <NavLink to={href} className={styles.links}>
      {({ isActive }) => {
        return (
          <>
            {cloneElement(icon, { type: isActive ? "primary" : "secondary" })}
            <p
              className={`text text_type_main-default ${
                isActive ? "text_color_primary" : "text_color_inactive"
              } ml-2`}
            >
              {title}
            </p>
          </>
        );
      }}
    </NavLink>
  );
}

AppHeaderLinks.propTypes = {
    href: PropTypes.string.isRequired,
    icon: PropTypes.element,
    title: PropTypes.string.isRequired
  }