import SwitchField from "./SwitchField";
import type { SwitchProps } from "@mui/material";

/**
 * Prop type for switch fields
 */
export type SwitchFieldProps = {
  /**
   * Is the switch checked by the user
   */
  checked?: boolean;
  /**
   * Is the switch checked by default
   */
  defaultChecked?: boolean;
  /**
   * Is the switch disabled
   */
  disabled?: boolean;
  /**
   * The helper text for the switch
   */
  helperText?: string;
  /**
   * The label for the switch
   */
  label?: string;
  /**
   * The name of the switch
   */
  name?: string;
  /**
   * Function to call when the switch changes
   */
  onChange: SwitchProps["onChange"];
  /**
   * The two toggle options for the switch
   */
  options?: [string, string];
  /**
   * The size of the switch
   */
  size?: "small" | "medium";
};

export default SwitchField as React.FC<SwitchFieldProps>;
