import type { RadioGroupProps, SxProps, Theme } from "@mui/material";

import RadioButtons from "./RadioButtons";

/**
 * Prop type for radio buttons
 */
export type RadioButtonsProps = {
  /**
   * The default value of the radio buttons
   */
  defaultValue?: string;
  /**
   * Is the radio button group disabled
   */
  disabled?: boolean;
  /**
   * The label placement for each radio
   */
  labelPlacement?: "end" | "start" | "top" | "bottom";
  /**
   * The name of the radio button group and each radio button
   */
  name?: string;
  /**
   * Function to call when the radio button group changes
   */
  onChange?: RadioGroupProps["onChange"];
  /**
   * The options for the radio buttons
   */
  options?: string[];
  /**
   * Should the radio buttons be displayed in a row
   */
  row?: boolean;
  /**
   * The size of the radio buttons
   */
  size?: "small" | "medium";
  /**
   * The style of the radio buttons
   */
  style?: SxProps<Theme>;
  /**
   * The title of the radio buttons
   */
  title?: string;
  /**
   * The value of the radio buttons
   */
  value?: string;
};

export default RadioButtons as React.FC<RadioButtonsProps>;
