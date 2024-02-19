import styles from "../profile/profile.module.css";
import { useNavigate, useLocation, Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../services/store/user/actions";
import { SyntheticEvent } from "react";

export default function Profile() {
  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useDispatch();

  const onExit = () => {
    // @ts-ignore
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div className={styles.wrap}>
      <nav
        className={`${styles.profile__nav} text text_type_main-medium mr-30`}
      >
        <Link className={styles.profile__nav_link} to="">
          <p
            className={`${
              location.pathname === "/profile"
                ? "text_color_primary"
                : "text_color_inactive"
            }`}
          >
            Профиль
          </p>
        </Link>
        <Link className={styles.profile__nav_link} to="orders">
          <p
            className={`${
              location.pathname === "/profile/orders"
                ? "text_color_primary"
                : "text_color_inactive"
            }`}
          >
            История заказов
          </p>
        </Link>
        <button
          onClick={onExit}
          className={`${styles.profile__nav_logout} text text_type_main-medium text_color_inactive`}
        >
          Выход
        </button>
        <p
          className={`${styles.profile__description} text text_type_main-default text_color_inactive mt-20 `}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <Outlet />
    </div>
  );
}
