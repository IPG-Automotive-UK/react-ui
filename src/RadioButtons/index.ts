import type { RadioGroupProps, SxProps, Theme } from "@mui/material";

import RadioButtons from "./RadioButtons";

export type RadioButtonsProps = {
  defaultValue?: string;
  disabled?: boolean;
  labelPlacement?: "end" | "start" | "top" | "bottom";
  name?: string;
  onChange?: RadioGroupProps["onChange"];
  options?: string[];
  row?: boolean;
  size?: "small" | "medium";
  style?: SxProps<Theme>;
  title?: string;
  value?: string;
};

export default RadioButtons as React.FC<RadioButtonsProps>;
