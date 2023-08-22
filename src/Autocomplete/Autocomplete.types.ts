export interface AutocompleteProps {
  /**
   * The label for the filter.
   */
  label: string;

  /**
   * multi select
   */
  multiple?: boolean;
  /**
   * Callback function to handle changes
   */
  onChange: (selectedOptions: string[] | string) => void;
  /**
   * The options to select from
   */
  options: string[];
  /**
   * The selected options
   */
  value: string[] | string;
  /**
   * If true, the label, input and helper text should be displayed in a disabled state.
   */
  disabled?: boolean;
  /**
   * The size of the select field.
   */
  size?: "small" | "medium";
  /**
   * The helper text to display below the select field.
   */
  helperText?: string;
  /**
   * If true, the component will display an error state.
   */
  error?: boolean;
  /**
   * If dense or normal, will adjust vertical spacing of this and contained components.
   */
  margin?: "none" | "dense" | "normal";
  /**
   * If true, the label will indicate that the input is required.
   */
  required?: boolean;
  /**
   * The variant to use.
   */
  variant?: "standard" | "outlined" | "filled";
}
