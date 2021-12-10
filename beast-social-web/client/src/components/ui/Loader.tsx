import { FC } from "react";

const LoaderEnum = {
  primary: "primary",
  secondary: "secondary",
  success: "success",
  danger: "danger",
  warning: "warning",
  info: "info",
  light: "light",
  dark: "dark",
} as const;

const variants = {
  primary: "text-primary",
  secondary: "text-secondary",
  success: "text-success",
  danger: "text-danger",
  warning: "text-warning",
  info: "text-info",
  light: "text-light",
  dark: "text-dark",
};

type LoaderEnumType = typeof LoaderEnum[keyof typeof LoaderEnum];

interface LoaderProps {
  // string, without line `type MyEnum =...`
  variant?: LoaderEnumType;
  size?: string;
}

function get_size(size: string | undefined = undefined) {
  return size
    ? {
        height: size,
        width: size,
      }
    : {};
}

const Loader: FC<LoaderProps> = ({ variant = LoaderEnum.warning, size }) => (
  <div
    className={`spinner-border ${variants[variant]}`}
    role="status"
    style={{ ...get_size(size) }}
  >
    <span className="visually-hidden">Loading...</span>
  </div>
);

export default Loader;
