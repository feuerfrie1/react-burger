import styles from "../form/form.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useEffect, SyntheticEvent } from "react";
import { TUseInput } from "../../hooks/useInput";

type TForm = {
  inputs: Array<TUseInput>;
  handleSubmit: (event: SyntheticEvent) => void;
  buttonText: string;
};

export default function Form({
  inputs,
  handleSubmit,
  buttonText,
}: TForm): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {inputs.map((input, index) => {
        return (
          <Input
            value={input.value}
            placeholder={input.placeholder}
            key={index}
            type={input.type}
            ref={index === 0 ? inputRef : null}
            name={input.name}
            onChange={(e) => input.setValue(e.target.value)}
            icon={input.icon}
            onIconClick={input.onIconClick}
            extraClass="mb-5"
          />
        );
      })}
      <Button htmlType="submit" type="primary" size="medium">
        {buttonText}
      </Button>
    </form>
  );
}
