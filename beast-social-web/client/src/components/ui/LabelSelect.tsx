import { FC, SelectHTMLAttributes } from "react";
import { selectValueCreators } from "../../hooks/useSelect";

interface OptionsParams {
  name: string;
  value: string;
}

interface LabelSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  defaultValue: string;
  options: OptionsParams[];
  valueCreators?: selectValueCreators;
}

const LabelSelect: FC<LabelSelectProps> = ({
  label,
  id,
  defaultValue,
  options,
  valueCreators,
  ...props
}) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label weight-regular">
      {label}
    </label>
    <select id={id} className="form-select" {...props} {...valueCreators}>
      {options.map((option, ind) => (
        <option value={option.value} defaultValue={defaultValue} key={ind}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
);

export default LabelSelect;
