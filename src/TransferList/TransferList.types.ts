export type TransferListItem = {
  primaryLabel: string;
  secondaryLabel?: string;
  key: string;
};

// Ensure selected items are provided if using handleChange
type ControlledProps =
  | {
      /**
       * Control the transfer of the items
       */
      handleChange: (value: string[]) => void;
      /**
       * Array of keys for the items on the right side.
       */
      selectedItems: string[];
    }
  | {
      /**
       * Control the transfer of the items
       */
      handleChange?: never;
      /**
       * Array of keys for the items on the right side.
       */
      selectedItems?: string[];
    };

export type TransferListProps = ControlledProps & {
  /**
   * Array of Items.
   */
  items: string[] | TransferListItem[];
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
  onChange?: (value: string[]) => void;
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
