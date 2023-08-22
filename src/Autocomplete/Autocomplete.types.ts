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
}
