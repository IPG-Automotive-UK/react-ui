export type TransferListItem = string | { label: string; id: string };

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
   * The key to be used for the label.
   */
  itemLabel?: (item: T) => string;
  /**
   * Callback fired when the items are transferred.
   */
  onTransfer?: (value: string[], intent: "toTarget" | "toSource") => void;
};

export type SingleListProps<T> = {
  checked: string[];
  filterKey: (item: T) => string;
  items: TransferListItem[] | T[];
  itemLabel: (item: T) => string;
  handleToggle: (x: string) => void;
  role: string;
};
