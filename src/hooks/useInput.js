import {useState} from "react";

export function useInput(input) {

  const [value, setValue] = useState(input.defaultValue || '');

  return {
    name: input.name,
    value,
    setValue,
    placeholder: input.placeholder || '',
    type: input.type || 'text',
    icon: input.icon || '',
    onIconClick: input.onIconClick || null
  }
}

export function usePasswordInput(input) {

  const [value, setValue] = useState(input.defaultValue || '');
  const [fieldType, setFieldType] = useState('password');

  return {
    name: 'password',
    value,
    setValue,
    placeholder: input.placeholder || '',
    type: fieldType,
    icon: 'ShowIcon',
    onIconClick: () => setFieldType(fieldType === 'password' ? 'text' : 'password')
  }
}