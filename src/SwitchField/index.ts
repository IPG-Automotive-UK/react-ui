import SwitchField from "./SwitchField";
import type { SwitchProps } from "@mui/material";

export type SwitchFieldProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  helperText?: string;
  label?: string;
  name?: string;
  onChange: SwitchProps["onChange"];
  options?: [string, string];
  size?: "small" | "medium";
};

export default SwitchField as React.FC<SwitchFieldProps>;
