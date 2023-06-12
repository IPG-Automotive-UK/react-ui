export interface SearhBarProps {
  /**
   * Callback fired when the input is blurred.
   * Notice that the first argument (event) might be undefined.
   */
  onBlur?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  /**
   * Callback fired when the value is changed.
   */
  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  /**
   * The short hint displayed in the input before the user enters a value.
   */
  placeholder?: string;
  /**
   * The value of the input element, required for a controlled component.
   */
  value?: string;
}
