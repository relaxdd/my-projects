import { ChangeEvent, useState } from "react";

export interface inputValueCreators {
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

type TypeInputValue = string;
type useInputType = [inputValueCreators, (value: TypeInputValue) => void];

const useInput = (initialValue: TypeInputValue): useInputType => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setValue(e.target.value);
  };

  const changeValue = (value: TypeInputValue) => setValue(value);

  return [{ value, onChange }, changeValue];
};

export default useInput;
