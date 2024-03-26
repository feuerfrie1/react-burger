import styles from "../login/login.module.css";
import Form from "../../components/form/form";
import { useInput } from "../../hooks/useInput";
import { register } from "../../services/store/user/actions";
import { SyntheticEvent } from "react";
import { useAppDispatch } from "../../services/store/hooks";
import FormInput from "../../components/form/form-input/form-input";

export default function Register(): JSX.Element {
  const name = useInput({
    name: "name",
  });

  const email = useInput({
    name: "email",
  });

  const password = useInput({
    name: "password",
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

  const dispatch = useAppDispatch();

  return (
    <div className={styles.wrap}>
      <h1 className="text text_type_main-medium pb-6">Регистрация</h1>
      <Form handleSubmit={handleSubmit} buttonText="Зарегистрироваться">
        <FormInput input={name} placeholder="Имя" />
        <FormInput input={email} placeholder="E-mail" />
        <FormInput
          input={password}
          placeholder="Пароль"
          type="password"
          icon="ShowIcon"
        />
      </Form>
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
