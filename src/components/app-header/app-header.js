import React from "react";
import styles from "./app-header.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <section className={styles.header__nav_main}>
          <div className={styles.header__nav_constructor}>
            <BurgerIcon />
            <p className={styles.header__nav_text}>Конструктор</p>
          </div>
          <div className={styles.header__nav_orders}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive p-2">
              Лента заказов
            </p>
          </div>
        </section>
        <Logo />
        <div className={styles.header__nav_personal}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive p-2">
            Личный кабинет
          </p>
        </div>
      </nav>
    </header>
  );
}

export default Header;
