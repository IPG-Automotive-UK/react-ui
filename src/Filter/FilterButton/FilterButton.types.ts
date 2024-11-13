// FilterButton props type
export type FilterButtonProps = {
  /**
   * The number of filters that are active.
   */
  count: number;
  /**
   * The label to display on the filter button.
   */
  label?: string;
  /**
   * Callback function when the filter button is clicked.
   */
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};
