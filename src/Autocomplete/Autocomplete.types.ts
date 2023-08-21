export interface AutocompleteProps {
  /**
   * The label for the filter.
   */
  label: string;
  /**
   * The number of selected tags to show
   */
  limitTags?: number;
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

export interface OptionProps extends React.HTMLAttributes<HTMLLIElement> {
  option: string;
  selected: boolean;
}
