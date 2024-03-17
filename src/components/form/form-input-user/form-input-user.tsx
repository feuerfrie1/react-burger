import { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { JSX, ChangeEvent, SyntheticEvent } from "react";
import { TUseInput } from "../../../hooks/useInput";

type TProps = {
  input: TUseInput;
  type?: "text" | "email" | "password";
  placeholder?: string;
  onClick: (event: SyntheticEvent) => void;
  icon: keyof TICons | undefined;
};

export default function FormInputUser({
  input,
  type = "text",
  placeholder,
  onClick,
  icon,
}: TProps): JSX.Element {
  return (
    <Input
      name={input.name}
      value={input.value}
      placeholder={placeholder}
      type={type}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        input.setValue(e.target.value)
      }
      onClick={onClick}
      extraClass="mb-6"
      icon={icon}
    />
  );
}
