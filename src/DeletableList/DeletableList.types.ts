export interface DeletableListProps {
  /**
   * Array of items to be displayed.
   */
  items: string[];
  /**
   * Callback fired when the user clicks on Delete("X") button
   */
  onDelete: (value: string) => void;
}
