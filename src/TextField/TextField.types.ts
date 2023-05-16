export interface TextFieldProps {
  /**
   * If true, the component is disabled.
   */
  disabled?: boolean;
  /**
   * Props applied to the [`Input`](/api/input/) element.
   */
  InputProps?: object;
  /**
   * If dense or normal, will adjust vertical spacing of this and contained components.
   */
  margin?: "none" | "dense" | "normal";
  /**
   * If true, text field will be masked.
   */
  isFieldMasked?: boolean;
  /**
   * Callback fired when the value changes.
   */
  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  /**
   * If true, the label is displayed as required and the input element is required.
   */
  required?: boolean;
  /**
   * The size of the component.
   */
  size?: "small" | "medium";
  /**
   * The value of the component.
   */
  value?: string;
  /**
   * The variant to use.
   */
  variant?: "standard" | "filled" | "outlined";
  /**
   * The label of the component.
   */
  label?: string;
  /**
   * The placeholder of the component.
   */
  placeholder?: string;
  /**
   * The helper text of the component.
   */
  helperText?: string;
  /**
   * The error text of the component.
   */
  error?: boolean;
}
