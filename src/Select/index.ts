import Select from "./Select";
import type { TextFieldProps } from "../TextField/index";

export type SelectProps = {
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  margin?: "dense" | "none" | "normal";
  onChange?: TextFieldProps["onChange"];
  options?: (string | number)[];
  required?: boolean;
  size?: "medium" | "small";
  value?: string | number;
  variant?: "filled" | "outlined" | "standard";
};

export default Select as React.FC<SelectProps>;
