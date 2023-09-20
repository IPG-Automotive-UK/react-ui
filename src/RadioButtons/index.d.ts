import type { RadioGroupProps, SxProps, Theme } from "@mui/material";

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

declare const RadioButtons: React.FC<RadioButtonsProps>;

export default RadioButtons;
