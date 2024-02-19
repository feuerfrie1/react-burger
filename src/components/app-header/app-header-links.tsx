import styles from "../app-header/app-header-links.module.css";
import { NavLink } from "react-router-dom";
import { cloneElement, ReactElement, JSX } from "react";

type TAppHeaderLinks = {
  href: string;
  icon?: ReactElement;
  title: string;
};

export default function AppHeaderLinks({
  href,
  icon,
  title,
}: TAppHeaderLinks): JSX.Element {
  return (
    <NavLink to={href} className={styles.links}>
      {({ isActive }) => {
        return (
          <>
            {icon &&
              cloneElement(icon, { type: isActive ? "primary" : "secondary" })}
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
