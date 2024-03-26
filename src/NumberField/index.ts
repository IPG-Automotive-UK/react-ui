import NumberField from "./NumberField";
import type { TextFieldProps } from "@mui/material";

export type NumberFieldProps = {
  defaultValue?: number;
  disabled?: boolean;
  endAdornment?: string;
  error?: boolean;
  helperText?: string;
  label?: string;
  margin?: "none" | "dense" | "normal";
  max?: number;
  min?: number;
  name?: string;
  onBlur?: () => {};
  onChange?: TextFieldProps["onChange"];
  placeholder?: number;
  required?: boolean;
  showMinMaxErrorMessage?: boolean;
  size?: "small" | "medium";
  startAdornment?: string;
  step?: number;
  stepper?: boolean;
  value?: number | null;
  variant?: "standard" | "filled" | "outlined";
};

export default NumberField as React.FC<NumberFieldProps>;
