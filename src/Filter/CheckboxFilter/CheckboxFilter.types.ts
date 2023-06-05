export interface CheckboxFilterProps {
  /**
   * The label for the filter.
   */
  label?: string;
  /**
   * The number of selected tags to show
   */
  limitTags?: number;
  /**
   * Input name.
   */
  name?: string;
  /**
   * Callback fired when the value changes.
   */
  onChange?: (value: string[]) => void;
  /**
   * The options to select from.
   */
  options: string[];
  /**
   * The size of the component.
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * The selected options.
   */
  value?: string[];
  /**
   * The variant of the filter
   */
  variant?: "always-open" | "popper";
}
