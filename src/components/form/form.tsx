import styles from "../form/form.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useEffect, SyntheticEvent, ReactNode, useState } from "react";

type TForm = {
  handleSubmit: (event: SyntheticEvent) => void;
  buttonText: string;
  children: ReactNode;
};

export default function Form({
  handleSubmit,
  buttonText,
  children,
}: TForm): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {children}
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        data-testid="login-button"
      >
        {buttonText}
      </Button>
    </form>
  );
}
