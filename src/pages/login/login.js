import styles from "../login/login.module.css";
import Form from "../../components/form/form";
import { useInput, usePasswordInput } from "../../hooks/useInput";
import { useDispatch } from "react-redux";
import { login } from "../../services/store/user/actions";

export default function Login() {
  const email = useInput({
    name: "email",
    placeholder: "E-mail",
    type: "email",
  });

  const password = usePasswordInput({
    placeholder: "Пароль",
  });

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      login({
        email: email.value,
        password: password.value,
      })
    );
  }

  const dispatch = useDispatch();

  return (
    <div className={styles.wrap}>
      <h1 className="text text_type_main-medium pb-6">Вход</h1>
      <Form
        inputs={[email, password]}
        handleSubmit={handleSubmit}
        buttonText="Войти"
      />
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы — новый пользователь?{" "}
        <a
          href="/register"
          className={`${styles.link} text text_type_main-default ml-2`}
        >
          Зарегистрироваться
        </a>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?{" "}
        <a
          href="/forgot-password"
          className={`${styles.link} text text_type_main-default ml-2`}
        >
          Восстановить пароль
        </a>
      </p>
    </div>
  );
}
