import {
  ChildData,
  Item,
  TooltipTreeItemProps,
  TreeNode,
  TreeViewListProps
} from "./TreeViewList.types";
import React, { useEffect, useState } from "react";
import { TreeItem, TreeView } from "@mui/x-tree-view";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Tooltip } from "@mui/material";
import { alpha } from "@mui/material/styles";

/**
 * A component that renders a tree view list.
 *
 * @template T The type of the options array elements.
 * @param props - The properties for the tree view list.
 * @property props.items - The items to display in the tree view list.
 * @property props.selected - The ID of the currently selected item.
 * @property props.searchTerm - The term to search for in the items.
 * @property [props.defaultExpanded=[]] - The IDs of the items that should be expanded by default.
 * @property props.expandSearchTerm - Weather to expand the tree when searching.
 * @property props.width - The width of the tree view list.
 * @property props.onSelectionChange - The function to call when the selection changes.
 * @returns The tree view list component.
 */
const TreeViewList = <T,>({
  items,
  selected,
  searchTerm = "",
  defaultExpanded = [],
  expandSearchTerm = false,
  width,
  onSelectionChange
}: TreeViewListProps<T>) => {
  // state for expanded nodes
  const [expanded, setExpanded] = useState(defaultExpanded);

  // state for items to display in the tree
  const [treeDisplayItems, setTreeDisplayItems] =
    useState<TreeViewListProps<T>["items"]>(items);

  // update tree items when the items or search term prop changes
  useEffect(() => {
    // if there's no search term or no items, set the tree items to the original items
    if (searchTerm === "" || items.length === 0) {
      setTreeDisplayItems(items);
      // return;
    }

    // split the search string into individual terms for comparison
    // const terms = searchTerm.toLowerCase().trim().split(" ");
    // terms = ["suspension", "david"]
    // items = [{name: "suspension david", children: [{name: "front", children: []}]}, {name: "suspension front david", children: [{name: "rear", children: []}]}]
    // matches = [];
    // loop over all terms
    // recrusively loop over all items
    // if the term is in the easierToReadThing, add it to matches
  }, [items, searchTerm]);

  // handle tree toggle
  const handleToggle = (
    event: React.SyntheticEvent<Element, Event>,
    nodeIds: string[]
  ) => {
    setExpanded(nodeIds);
  };

  // render the tree nodes with optional tooltips
  const renderTree = (nodes: TreeNode[], hasParent = false) =>
    nodes.map(node => (
      <TooltipTreeItem
        key={node.id}
        nodeId={node.id}
        label={node.id}
        tooltip={node.tooltip ? node.tooltip : ""}
        node={node}
        hasParent={hasParent}
        onSelectionChange={onSelectionChange}
      >
        {Array.isArray(node.children) && node.children.length > 0
          ? renderTree(node.children, true)
          : null}
      </TooltipTreeItem>
    ));

  return (
    <TreeView
      defaultCollapseIcon={<RemoveIcon />}
      defaultExpandIcon={<AddIcon />}
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleToggle}
      sx={{ width }}
    >
      {renderTree(buildTreeNodes(treeDisplayItems))}
    </TreeView>
  );
};

/**
 * Creates a tree view list item with an optional tooltip.
 *
 * @param props - The properties for the tooltip tree item.
 * @property props.tooltip - The tooltip to display.
 * @property props.nodeId - The unique ID of the tree item.
 * @property props.children - The children of the tree item.
 * @property props.label - The label of the tree item.
 * @property props.node - The tree node.
 * @property props.hasParent - Whether the tree item has a parent.
 * @property props.onSelectionChange - The function to call when the selection changes.
 * @returns The tree item wrapped in a tooltip.
 */
const TooltipTreeItem = (props: TooltipTreeItemProps) => {
  const handleClick = () => {
    if (props.children === null) {
      props.onSelectionChange(props.node.name);
    }
  };
  return (
    <Tooltip
      disableFocusListener
      title={
        props.tooltip ? (
          <>
            <strong>{props.node.name}</strong>
            <br />
            {props.tooltip}
          </>
        ) : (
          ""
        )
      }
      placement="right"
    >
      <TreeItem
        {...props}
        onClick={handleClick}
        sx={theme => ({
          borderLeft: props.hasParent
            ? `1px solid ${alpha(theme.palette.text.primary, 0.1)}`
            : "none",
          color: theme.palette.text.primary,
          padding: "5px"
        })}
      />
    </Tooltip>
  );
};

/**
 * Creates a new tree node with the given properties.
 *
 * @param id - The ID of the new node.
 * @param name - The name of the new node.
 * @param tooltip - The tooltip of the new node.
 * @param [disable=true] - Optional parameter that indicates whether the node is disabled. Defaults to true.
 * @returns The newly created tree node.
 */
function createNode(
  id: string,
  name: string,
  tooltip?: string,
  disable = true
): TreeNode {
  return {
    children: [],
    disable,
    id,
    name,
    tooltip
  };
}

/**
 * Builds a tree node structure from a list of items with parent-child relationships.
 *
 * @template T The type of the options array elements.
 * @param data - The flat list of items to transform into a tree.
 * @returns The tree structure built from the input items.
 * @example buildTree(items) // returns TreeNode[]
 */
function buildTreeNodes<T>(data: Item<T>[]) {
  // create array to hold nodes
  const itemsTree: TreeNode[] = [];

  // iterate through each item
  data.forEach(item => {
    // create node for this root model
    const name = item.name ? item.name.toString() : "default";
    const tooltip = item.tooltip ? item.tooltip.toString() : undefined;
    const parentNode = createNode(name, name, tooltip);
    itemsTree.push(parentNode);

    // parse options and children recursively
    if (Array.isArray(item.options)) {
      item.options.forEach(childData => {
        parseChild(parentNode, childData);
      });
    }

    if (Array.isArray(item.children)) {
      item.children.forEach(childData => {
        parseChild(parentNode, childData);
      });
    }
  });

  return itemsTree;
}

/**
 * Type guard to check if a variable is of type ChildData<T>.
 *
 * @template T The type of the options array elements.
 * @param data - The variable to check.
 * @returns A boolean indicating whether the variable is of type ChildData<T>.
 */
function isChildData<T>(data: any): data is ChildData<T> {
  return data.children !== undefined || data.options !== undefined;
}

/**
 * Parses a child node and adds it to the parent node.
 *
 * @template T The type of the options array elements.
 * @param parentNode - The parent node to which the child node will be added.
 * @param childData - The data of the child node.
 */
function parseChild<T>(parentNode: TreeNode, childData: ChildData<T> | T) {
  // if childData is of type T and not ChildData<T>, return
  if (!isChildData(childData)) return;

  // ignore if child data is a leaf node, i.e. has no children or options
  if (!childData.children && !childData.options) return;

  // set tooltip if it exists in child data else set to undefined
  const tooltip = childData.tooltip ? childData.tooltip.toString() : undefined;

  // create node for this child
  const thisNode = createNode(
    childData.name,
    parentNode.name + "." + childData.name,
    tooltip
  );
  parentNode.children.push(thisNode);

  // parse children of this child recursively
  if (childData.children) {
    childData.children.forEach((child: ChildData<T>) => {
      parseChild(thisNode, child);
    });
  }

  // parse options of this child recursively
  if (childData.options) {
    childData.options.forEach((child: T) => {
      parseChild(thisNode, child);
    });
  }
}

export default TreeViewList;
