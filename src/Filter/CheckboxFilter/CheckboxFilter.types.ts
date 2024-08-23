/**
 * Props definition for the CheckboxFilter component
 */
export type CheckboxFilterProps = {
  /**
   * Label for filter
   */
  label?: string;
  /**
   * How many tags to show before truncating and showing the plus sign, -1 is no limit.
   */
  limitTags?: number;
  /**
   * Name of the filter
   */
  name?: string;
  /**
   * OnChange handler for the filter box
   * @param value the value to add/delete from the filtered values
   * @returns void
   */
  onChange: (value: string[] | null) => void;
  /**
   * Options to choose from in the dropdown/ always open box
   */
  options: string[];
  /**
   * Current value of what's been selected
   */
  value?: string[];
  /**
   * The variant of the filter, popper or always open
   */
  variant?: "popper" | "always-open";
  /**
   * Whether the filter is disabled or not
   */
  disabled?: boolean;
};
