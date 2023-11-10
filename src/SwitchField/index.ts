import type { SwitchProps } from "@mui/material";

export type SwitchFieldProps = {
  checked?: boolean;
  disabled?: boolean;
  helperText?: string;
  label?: string;
  onChange: SwitchProps["onChange"];
  options?: [string, string];
  size?: "small" | "medium";
};

declare const SwitchField: React.FC<SwitchFieldProps>;

export default SwitchField;
