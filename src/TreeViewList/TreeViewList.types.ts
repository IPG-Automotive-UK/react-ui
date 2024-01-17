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
   * The term to search for in the items.
   */
  searchTerm: string;

  /**
   * The IDs of the items that should be expanded by default.
   */
  defaultExpanded?: string[];

  /**
   * The function to call when the selection changes.
   */
  onSelectionChange: (value: string) => void;
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
 * Properties for the parseChild function.
 */
export type ParseChildProps = {
  /**
   * The nodes to add the new child node to.
   */
  nodes: TreeNode[];

  /**
   * The characteristic value of the new child node. This would be the last child displayed.
   */
  characteristic: string;

  /**
   * The name of the new child node.
   */
  name: string;

  /**
   * The tooltip of the new child node.
   */
  tooltip: string;
};

/**
 * Properties for the findOrCreateNode function.
 */
export type FindOrCreateNodeProps = {
  /**
   * The nodes to find or create a node in.
   */
  nodes: TreeNode[];

  /**
   * The ID of the node to find or create.
   */
  id: string;

  /**
   * The name of the node to find or create.
   */
  name: string;

  /**
   * The tooltip of the node to find or create.
   */
  tooltip?: string;
};
