import { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { JSX, ChangeEvent, useState } from "react";
import { TUseInput } from "../../../hooks/useInput";

type TFieldType = "text" | "email" | "password";
type TFieldIcon = keyof TICons | undefined;

type TProps = {
  input: TUseInput;
  type?: TFieldType;
  placeholder?: string;
  icon?: TFieldIcon;
  onIconCLick?: () => void;
  testId?: string;
};

export default function FormInput({
  input,
  type = "text",
  placeholder,
  icon,
  onIconCLick,
  testId,
}: TProps): JSX.Element {
  const [fieldType, setFieldType] = useState<TFieldType>(type);
  const [fieldIcon, setFieldIcon] = useState<TFieldIcon>(icon);
  function onIconClickHandler() {
    return type === "password"
      ? setFieldType(fieldType === "password" ? "text" : "password")
      : onIconCLick;
  }

  return (
    <Input
      name={input.name}
      value={input.value}
      placeholder={placeholder}
      type={fieldType}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        input.setValue(e.target.value)
      }
      extraClass="mb-6"
      icon={fieldIcon}
      onIconClick={onIconClickHandler}
      data-testid={testId}
    />
  );
}
