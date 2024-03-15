import styles from "./app-header.module.css";
import {
  Logo,
  ListIcon,
  BurgerIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import AppHeaderLinks from "./app-header-links";
import { JSX } from "react";

function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <section className={styles.header__nav_main}>
          <AppHeaderLinks
            href="/"
            icon={<BurgerIcon type="primary" />}
            title="Конструктор"
          ></AppHeaderLinks>
          <AppHeaderLinks
            href="/feed"
            icon={<ListIcon type="primary" />}
            title="Лента заказов"
          ></AppHeaderLinks>
        </section>
        <Link to="/">
          <Logo />
        </Link>
        <AppHeaderLinks
          href="/profile"
          icon={<ProfileIcon type="primary" />}
          title="Личный кабинет"
        ></AppHeaderLinks>
      </nav>
    </header>
  );
}

export default Header;
