export interface DeletableListProps {
  /**
   * Array of list to be displayed.
   */
  list: string[];
  /**
   * Callback fired when the user clicks on Delete("X") button
   */
  onDelete: (value: string) => void;
}
