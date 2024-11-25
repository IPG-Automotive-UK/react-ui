// ClearFilterButton props type
export type ClearFilterButtonProps = {
  /**
   * The label to display on the clear filter button.
   */
  label?: string;
  /**
   * Callback function when the clear filter button is clicked.
   */
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};
