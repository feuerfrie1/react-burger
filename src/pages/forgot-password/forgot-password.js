import styles from "../login/login.module.css";
import Form from "../../components/form/form";
import { useInput } from "../../hooks/useInput";
import {useLocation, useNavigate} from "react-router-dom";
import {ingredientsApi, makeRequest } from "../../utils/ingredients-api";

export default function ForgotPassword() {

  const location = useLocation();
  const navigate = useNavigate();

  const email = useInput({
    name: "email",
    placeholder: "E-mail",
    type: "email",
  });

  async function resetPassword (body) {
    return await makeRequest(`${ingredientsApi}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({...body})
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    resetPassword({
      email: email.value
    }).then(()=>{
      return navigate('/reset-password', {state: {from: location.pathname}})
    })

  }

  return (
    <div className={styles.wrap}>
      <h1 className="text text_type_main-medium pb-6">Восстановление пароля</h1>
      <Form
        inputs={[email]}
        handleSubmit={handleSubmit}
        buttonText="Восстановить"
      />
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?{" "}
        <a
          href='/login'
          className={`${styles.link} text text_type_main-default ml-2`}
        >
          Войти
        </a>
      </p>
    </div>
  );
}
