import { ChangeEvent, useState } from "react";

export interface selectValueCreators {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

type TypeSelectValue = string;
type useSelectType = [selectValueCreators, (value: TypeSelectValue) => void];

const useSelect = (initialValue: TypeSelectValue): useSelectType => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    return setValue(e.target.value);
  };

  const changeValue = (value: TypeSelectValue) => setValue(value);

  return [{ value, onChange }, changeValue];
};

export default useSelect;
