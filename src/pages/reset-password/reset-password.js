import styles from "../login/login.module.css";
import Form from "../../components/form/form";
import { ingredientsApi, makeRequest } from "../../utils/ingredients-api";
import { Navigate, useLocation } from "react-router-dom";
import { useInput, usePasswordInput } from "../../hooks/useInput";

export default function ResetPassword() {
  const location = useLocation();

  const password = usePasswordInput({
    placeholder: "Введите новый пароль  ",
  });

  const code = useInput({
    name: "code",
    placeholder: "Введите код из письма",
  });

  if (location.state?.from !== "/forgot-password") {
    return <Navigate to="/" />;
  }

  async function setNewPassword(body) {
    return await makeRequest(`${ingredientsApi}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ ...body }),
    });
  }
  function handleSubmit(e) {
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
      <Form
        inputs={[password, code]}
        handleSubmit={handleSubmit}
        buttonText="Сохранить"
      />
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
