export type TransferListItem = string | { label: string; id: string };

export type TransferListProps<T> = {
  /**
   * The key to be used for the filter.
   */
  filterKey?: (item: T) => string;
  /**
   * Array of Items.
   */
  items?: TransferListItem[] | T[];
  /**
   * Array of keys for the items on the right side.
   */
  initialTargetItemKeys?: string[];
  /**
   * Array of selectedItems.
   */
  selectedItems?: string[];
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
  onTransfer?: (value: string[], intent: "ltr" | "rtl") => void;
};
