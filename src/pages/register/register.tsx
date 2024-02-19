import styles from "../login/login.module.css";
import Form from "../../components/form/form";
import { useInput } from "../../hooks/useInput";
import { register } from "../../services/store/user/actions";
import { useDispatch } from "react-redux";
import { SyntheticEvent } from "react";

export default function Register(): JSX.Element {
  const name = useInput({
    name: "name",
    placeholder: "Имя",
  });

  const email = useInput({
    name: "email",
    placeholder: "E-Mail",
  });

  const password = useInput({
    name: "password",
    placeholder: "Пароль",
  });

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    dispatch(
      // @ts-ignore
      register({
        email: email.value,
        password: password.value,
        name: name.value,
      })
    );
  }

  const dispatch = useDispatch();

  return (
    <div className={styles.wrap}>
      <h1 className="text text_type_main-medium pb-6">Регистрация</h1>
      <Form
        inputs={[name, email, password]}
        handleSubmit={handleSubmit}
        buttonText="Зарегистрироваться"
      />
      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?{" "}
        <a
          href="/login"
          className={`${styles.link} text text_type_main-default ml-2`}
        >
          Войти
        </a>
      </p>
    </div>
  );
}
