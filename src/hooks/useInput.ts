import React, {useState} from "react";


type TProps = {
    name: string;
    defaultValue?: string;
}

export type TUseInput = {
    name: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export function useInput(input: TProps): TUseInput {
    const [value, setValue] = useState<string>(input.defaultValue || '');

    return {
        name: input.name,
        value,
        setValue,
    }
}