import styles from "./app-header.module.css";
import {
  Logo,
  ListIcon,
  BurgerIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import AppHeaderLinks from "../app-header/app-header-links";

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <section className={styles.header__nav_main}>
          <AppHeaderLinks
            href="/"
            icon={<BurgerIcon type="" />}
            title="Конструктор"
          ></AppHeaderLinks>
          <AppHeaderLinks
            href="/orders"
            icon={<ListIcon type="" />}
            title="Лента заказов"
          ></AppHeaderLinks>
        </section>
        <Link to="/">
          <Logo />
        </Link>
        <AppHeaderLinks
          href="/profile"
          icon={<ProfileIcon type="" />}
          title="Личный кабинет"
        ></AppHeaderLinks>
      </nav>
    </header>
  );
}

export default Header;
