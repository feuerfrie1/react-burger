import { Link } from "react-router-dom";
import styles from "../notfound/not-found.module.css";

export const NotFound404 = () => {
  return (
    <div className={styles.notfound}>
      <div className={styles.notfound__content}>
        <p className={`${styles.digits} text text_type_digits-large`}>404</p>
        <p className="text text_type_main-large mb-20">
          Такой страницы не существует
        </p>
        <Link
          to="/"
          className={`${styles.link} text text_type_main-default text_color_inactive`}
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};
