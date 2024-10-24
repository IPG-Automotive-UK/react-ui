export type TableCardProps = {
  /**
   * The action to be displayed in the card.
   */
  action?: React.ReactNode;
  /**
   * The content of table to be displayed in the card.
   */
  tableContent?: [string, string | React.ReactNode][];
  /**
   * The title of the card.
   */
  title?: string;
};
