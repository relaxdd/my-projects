import { FC, InputHTMLAttributes } from "react";
import { inputValueCreators } from "../../hooks/useInput";

interface LabelControlProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  small?: string;
  valueCreators?: inputValueCreators;
}

const LabelControl: FC<LabelControlProps> = ({
  label,
  id,
  small,
  valueCreators,
  ...props
}): JSX.Element => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label weight-regular">
      {label}
    </label>
    <input id={id} className="form-control" {...props} {...valueCreators} />
    {small && (
      <small className="form-text" style={{ display: "block" }}>
        {small}
      </small>
    )}
  </div>
);

export default LabelControl;
