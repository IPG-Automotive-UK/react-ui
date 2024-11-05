export type TransferListItem = {
  primaryLabel: string;
  secondaryLabel?: string;
  key: string;
};

export type TransferListProps = {
  /**
   * Control the transfer of the items
   */
  handleTransfer?: (value: string[], intent: "toTarget" | "toSource") => void;
  /**
   * Array of Items.
   */
  items: string[] | TransferListItem[];
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
    secondaryLabel?: string;
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
