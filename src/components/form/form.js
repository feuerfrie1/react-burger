import styles from "../form/form.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

export default function Form({ inputs, handleSubmit, buttonText }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
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
      {handleSubmit && (
        <Button htmlType="submit" type="primary" size="medium">
          {buttonText}
        </Button>
      )}
    </form>
  );
}

Form.propTypes = {
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.node.isRequired,
      placeholder: PropTypes.string,
      type: PropTypes.string,
      name: PropTypes.string,
      icon: PropTypes.string,
    })
  ),
};
