export type TransferListItem = {
  primaryLabel: string;
  secondaryLabel?: string;
  key: string;
};

export type TransferListProps = {
  /**
   * Array of default keys to initialist the right hand side for uncontrolled use
   */
  defaultSelectedItems?: string[];
  /**
   * Array of Items.
   */
  items: string[] | TransferListItem[];
  /**
   * Callback fired when the items are transferred.
   */
  onChange?: (value: string[] | TransferListItem[]) => void;
  /**
   * Array of keys for the items on the right side for controlled use
   */
  selectedItems?: string[];
  /**
   * Source list label
   */
  sourceListLabel?: string;
  /**
   * Target list label
   */
  targetListLabel?: string;
};

export type SingleListProps = {
  /**
   * Checked items
   */
  checked: string[];
  /**
   * ID of the list is also used to get the list aria label
   */
  id: string;
  /**
   * Item array
   */
  items: {
    /**
     * Unique identifier
     */
    key: string;
    /**
     * Primary label of the item
     */
    primaryLabel: string;
    /**
     * Secondary label of the item
     */
    secondaryLabel?: string;
  }[];
  /**
   * Toggle function
   */
  handleToggle: (key: string) => void;
};
