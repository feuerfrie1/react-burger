import React, { useState } from "react";
import { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

type TUseInputProps = {
  name: string;
  email?: string;
  password?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
};

export type TUseInput = {
  name: string;
  email?: string;
  password?: string;
  value: string;
  type?: any;
  icon?: keyof TICons | undefined;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onIconClick?: () => void;
  input?: string;
  placeholder?: string;
};

export function useInput(input: TUseInputProps) {
  const [value, setValue] = useState(input.defaultValue || "");
  return {
    name: input.name,
    value,
    setValue,
    placeholder: input.placeholder || "",
  };
}

export function usePasswordInput(input: TUseInputProps) {
  const [value, setValue] = useState(input.defaultValue || "");
  const [fieldType, setFieldType] = useState("password");

  return {
    name: "password",
    value,
    setValue,
    placeholder: input.placeholder || "",
    type: fieldType,
    icon: "ShowIcon",
    onIconClick: () =>
      setFieldType(fieldType === "password" ? "text" : "password"),
  };
}
