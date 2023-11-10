import type { TextFieldProps } from "../TextField";

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

declare const Select: React.FC<SelectProps>;

export default Select;
