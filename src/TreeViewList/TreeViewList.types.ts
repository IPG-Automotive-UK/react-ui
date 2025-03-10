import { TreeViewProps } from "@mui/x-tree-view";

/**
 * Represents a node in a tree structure.
 */
export type TreeNodeItem = {
  /**
   * The child nodes of the node.
   */
  children?: TreeNodeItem[];

  /**
   * If true, the node is disabled.
   */
  disabled?: boolean;

  /**
   * The tree node label.
   */
  label: string;

  /**
   * The ID of the node.
   */
  nodeId: string;

  /**
   * The tooltip of the node.
   */
  tooltip?: string;
};

/**
 * Callback fired when a node is selected.
 */
type OnNodeSelect = (
  event: React.SyntheticEvent,
  nodeId: string,
  nodes: string[]
) => void;

/**
 * Properties for the TreeViewList component.
 */
export type TreeViewListProps = {
  /**
   * If true, the search input is displayed. Defaults to false.
   */
  enableSearch?: boolean;

  /**
   * If true, the tree nodes will be automatically expanded when a search term is entered. Defaults to false.
   */
  expandSearchResults?: boolean;

  /**
   * The number of items to automactically expand when expandSearchResults is true. Defaults to 1.
   */
  expandItems?: number;

  /**
   * The items to display in the tree view list.
   */
  items: TreeNodeItem[];

  /**
   * Callback fired when tree items are selected/unselected.
   */
  onNodeSelect: OnNodeSelect;

  /**
   * Callback fired when tree items are expanded/collapsed.
   */
  onNodeToggle?: TreeViewProps<false>["onExpandedItemsChange"];

  /**
   * The ID of the currently selected node.
   */
  selected: TreeViewProps<false>["selectedItems"];

  /**
   * The display height of the tree view list. This is optional.
   */
  height?: string;

  /**
   * The display width of the tree view list. This is optional.
   */
  width?: string;
};
