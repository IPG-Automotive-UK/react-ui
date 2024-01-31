/**
 * Represents a node in a tree structure.
 */
export type TreeNodeItem = {
  /**
   * The name of the node.
   */
  name: string;

  /**
   * The ID of the node.
   */
  id: string;

  /**
   * The child nodes of the node.
   */
  children?: TreeNodeItem[];

  /**
   * Whether the node is disabled.
   */
  disable?: boolean;

  /**
   * The tooltip of the node.
   */
  tooltip?: string;
};

/**
 * Properties for the TreeViewList component.
 */
export type TreeViewListProps = {
  /**
   * The items to display in the tree view list.
   */
  items: TreeNodeItem[];

  /**
   * The ID of the currently selected item.
   */
  selected: string;

  /**
   *  The term to search for in the items. This is optional.
   */
  searchTerm?: string;

  /**
   * Flag indicating whether the search term should be expanded in the tree view list. This is optional.
   */
  expandSearchTerm?: boolean;

  /**
   * The IDs of the items that should be expanded by default. This is optional.
   */
  defaultExpanded?: string[];

  /**
   * The function to call when the selection changes.
   */
  onSelectionChange: (value: string) => void;

  /**
   * The display width of the tree view list. This is optional.
   */
  width?: string;
};

/**
 * Properties for the TooltipTreeItem component.
 */
export type TooltipTreeItemProps = {
  /**
   * The tooltip of the tree item.
   */
  tooltip: string;

  /**
   * The ID of the node.
   */
  nodeId: string;

  /**
   * The child nodes of the tree item.
   */
  children?: React.ReactNode;

  /**
   * The label of the tree item.
   */
  label: string;

  /**
   * The tree node.
   */
  node: TreeNodeItem;

  /**
   * Whether the tree item has a parent.
   */
  hasParent?: boolean;

  /**
   * The function to call when the selection changes.
   */
  onSelectionChange: (value: string) => void;
};
