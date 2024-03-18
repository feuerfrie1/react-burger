import styles from "../login/login.module.css";
import Form from "../../components/form/form";
import { useInput } from "../../hooks/useInput";
import { login } from "../../services/store/user/actions";
import { JSX, FormEvent, ChangeEvent } from "react";
import { useAppDispatch } from "../../services/store/hooks";
import FormInput from "../../components/form/form-input/form-input";

export default function Login(): JSX.Element {
  const email = useInput({
    name: "email",
  });

  const password = useInput({
    name: "password",
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch(
      login({
        email: email.value,
        password: password.value,
      })
    );
  }

  const dispatch = useAppDispatch();

  return (
    <div className={styles.wrap}>
      <h1 className="text text_type_main-medium pb-6">Вход</h1>
      <Form handleSubmit={handleSubmit} buttonText="Войти">
        <FormInput
          input={email}
          placeholder="E-mail"
          testId='email-input'
        />
        <FormInput
          input={password}
          placeholder="Пароль"
          type="password"
          icon="ShowIcon"
          testId='password-input'
        />
      </Form>
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
