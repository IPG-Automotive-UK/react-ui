/**
 * Represents an item with arbitrary properties.
 */
export type Item<T> = {
  /**
   * The value of the item.
   */
  [key: string]: T;
};

/**
 * Properties for the TreeViewList component.
 */
export type TreeViewListProps<T> = {
  /**
   * The items to display in the tree view list.
   */
  items: Item<T>[];

  /**
   * The ID of the currently selected item.
   */
  selected: string;

  /**
   *  The term to search for in the items. This is optional.
   */
  searchTerm?: string;

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
 * Represents a node in a tree structure.
 */
export type TreeNode = {
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
  children: TreeNode[];

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
  node: TreeNode;
};

/**
 * Type representing a child in a tree structure.
 *
 * @template T The type of the options array elements.
 */
export type ChildData<T> = {
  /** The name of the node. */
  name: string;

  /**
   * Optional array of child nodes.
   * Each child is also a `ChildData` object, allowing for a nested tree structure.
   */
  children?: ChildData<T>[];

  /**
   * Optional array of options. The options are displayed as the last child.
   * The type of the elements in this array is defined by the generic parameter `T`.
   */
  options?: T[];

  /**
   * The tooltip of the child. This is optional.
   */
  tooltip?: string;
};
