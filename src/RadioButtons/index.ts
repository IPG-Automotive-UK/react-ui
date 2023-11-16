import type { RadioGroupProps, SxProps, Theme } from "@mui/material";

import RadioButtons from "./RadioButtons";

export type RadioButtonsProps = {
  disabled?: boolean;
  labelPlacement?: "end" | "start" | "top" | "bottom";
  onChange?: RadioGroupProps["onChange"];
  options?: string[];
  row?: boolean;
  size?: "small" | "medium";
  style?: SxProps<Theme>;
  title?: string;
  value?: string;
};

export default RadioButtons as React.FC<RadioButtonsProps>;
