export type TransferListItem = {
  /**
   * Unique key
   */
  key: string;
  /**
   * Primary label rendered in an item
   */
  primaryLabel: string;
  /**
   * Secondary label rendered in an item
   */
  secondaryLabel?: string;
};

export type TransferListProps = {
  /**
   * Array of default keys to initialise the right hand side for uncontrolled use
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

/**
 * Type representing the check state for the transfer list.
 */
export type HandleCheckProps = {
  /**
   * Indicates whether the list is filtered.
   */
  isFiltered: boolean;
  /**
   * Array of all items in the list (can be strings or TransferListItem objects).
   */
  allItems: (TransferListItem | string)[];
  /**
   * Array of filtered items based on the search input.
   */
  filteredItems: (TransferListItem | string)[];
};
