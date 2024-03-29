import styles from "../login/login.module.css";
import Form from "../../components/form/form";
import { makeRequest } from "../../utils/ingredients-api";
import { Navigate, useLocation } from "react-router-dom";
import { useInput } from "../../hooks/useInput";
import { JSX, SyntheticEvent } from "react";
import { INGREDIENTS_API } from "../../utils/constants";
import FormInput from "../../components/form/form-input/form-input";

type TResetPassword = {
  password: string;
  token: string;
};

export default function ResetPassword(): JSX.Element {
  const location = useLocation();

  const password = useInput({
    name: "password",
  });

  const code = useInput({
    name: "code",
  });

  if (location.state?.from !== "/forgot-password") {
    return <Navigate to="/" />;
  }

  async function setNewPassword(body: TResetPassword) {
    return await makeRequest(`${INGREDIENTS_API}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ ...body }),
    });
  }
  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setNewPassword({
      password: password.value,
      token: code.value,
    }).then(() => {
      return <Navigate to="/" />;
    });
  }

  return (
    <div className={styles.wrap}>
      <h1 className="text text_type_main-medium pb-6">Восстановление пароля</h1>
      <Form handleSubmit={handleSubmit} buttonText="Сохранить">
        <FormInput
          input={password}
          placeholder="Пароль"
          type="password"
          icon="ShowIcon"
        />
        <FormInput input={code} placeholder="Введите код из письма" />
      </Form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?{" "}
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
