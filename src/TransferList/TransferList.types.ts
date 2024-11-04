export type TransferListItem =
  | string
  | { primaryLabel: string; secondaryLabel?: string; id: string };

export type TransferListProps<T> = {
  /**
   * The key to be used for the filter.
   */
  filterKey?: (item: T) => string;
  /**
   * Control the transfer of the items
   */
  handleTransfer?: (value: string[], intent: "toTarget" | "toSource") => void;
  /**
   * Array of Items.
   */
  items: TransferListItem[] | T[];
  /**
   * Array of keys for the items on the right side.
   */
  targetListKeys?: string[];
  /**
   * Source list label
   */
  sourceListLabel: string;
  /**
   * Target list label
   */
  targetListLabel: string;
  /**
   * Props for the default item
   */
  itemProps?: {
    /**
     * The key to be used for the primary label
     */
    primaryLabel: (item: T) => string;
    /**
     * The key to be used for the secondary label
     */
    secondaryLabel?: (item: T) => string;
  };
  /**
   * Callback fired when the items are transferred.
   */
  onTransfer?: (value: string[], intent: "toTarget" | "toSource") => void;
};

export type SingleListProps = {
  /**
   * Checked items
   */
  checked: string[];
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
    secondaryLabel: string;
  }[];
  /**
   * Toggle function
   */
  handleToggle: (key: string) => void;
  /**
   * Role of the list
   */
  role: string;
};
