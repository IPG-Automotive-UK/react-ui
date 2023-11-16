import SwitchField from "./SwitchField";
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

export default SwitchField as React.FC<SwitchFieldProps>;
