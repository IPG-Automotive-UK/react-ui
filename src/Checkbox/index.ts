import Checkbox from "./Checkbox";

/**
 * Prop type for checkboxes
 */
export type CheckboxProps = {
  /**
   * Is the checkbox checked by the user
   */
  checked?: boolean;
  /**
   * Is the checkbox checked by default
   */
  defaultChecked?: boolean;
  /**
   * Is the checkbox disabled
   */
  disabled?: boolean;
  /**
   * The checkbox label
   */
  label?: string;
  /**
   * The name of the checkbox
   */
  name?: string;
  /**
   * Function to call when the checkbox changes
   * @param event - the event that triggered the change
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * The size of the checkbox
   */
  size?: "small" | "medium";
  /**
   * The style of the checkbox
   */
  style?: React.CSSProperties;
};

export default Checkbox as React.FC<CheckboxProps>;
