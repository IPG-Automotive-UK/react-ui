import type { TextFieldProps } from "@mui/material";

export type NumberFieldProps = {
  disabled?: boolean;
  endAdornment?: string;
  error?: boolean;
  helperText?: string;
  label?: string;
  margin?: "none" | "dense" | "normal";
  max?: number;
  min?: number;
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

declare const NumberField: React.FC<NumberFieldProps>;

export default NumberField;
