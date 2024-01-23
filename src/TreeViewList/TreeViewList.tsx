import {
  ChildData,
  Item,
  TooltipTreeItemProps,
  TreeNode,
  TreeViewListProps
} from "./TreeViewList.types";
import React, { useState } from "react";
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
 * @property props.onSelectionChange - The function to call when the selection changes.
 * @returns The tree view list component.
 */
const TreeViewList = <T,>({
  items,
  selected,
  searchTerm,
  defaultExpanded = [],
  width,
  onSelectionChange
}: TreeViewListProps<T>) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  // handle tree toggle
  const handleToggle = (
    event: React.SyntheticEvent<Element, Event>,
    nodeIds: string[]
  ) => {
    setExpanded(nodeIds);
  };

  // tooltip tree item
  const TooltipTreeItem = (props: TooltipTreeItemProps) => {
    const handleClick = () => {
      if (props.children === null) {
        onSelectionChange(props.node.name);
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
            borderLeft: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
            color: theme.palette.text.primary,
            padding: "5px"
          })}
        />
      </Tooltip>
    );
  };

  // recursive search function
  const applySearch = (search: string, parameters: Item<T>[]): Item<T>[] => {
    const terms = search
      .toUpperCase()
      .trim()
      .split(/(?:\.| )+/);

    const searchInItem = (item: Item<T>): Item<T> | null => {
      const match = terms.some(term =>
        typeof item.name === "string"
          ? item.name.toUpperCase().includes(term)
          : false
      );

      if (match) {
        // if the item matches any of the search terms, return the whole item
        return item;
      }

      const children = Array.isArray(item.children)
        ? item.children.map(searchInItem).filter(Boolean)
        : [];
      const options = Array.isArray(item.options)
        ? item.options
            .map((option: Item<T>) => {
              if (typeof option === "object" && option !== null) {
                return searchInItem(option as Item<T>);
              }
              return null;
            })
            .filter(Boolean)
        : [];

      if (children.length > 0 || options.length > 0) {
        return {
          ...item,
          children: children as T,
          options: options as T
        };
      }

      return null;
    };

    return parameters.map(searchInItem).filter(Boolean) as Item<T>[];
  };

  // build tree nodes
  const parameters = buildTree(
    searchTerm !== undefined && searchTerm !== ""
      ? applySearch(searchTerm, items)
      : items
  );

  const renderTree = (nodes: TreeNode[]) =>
    nodes.map(node => (
      <TooltipTreeItem
        key={node.id}
        nodeId={node.id}
        label={node.id}
        tooltip={node.tooltip ? node.tooltip : ""}
        node={node}
      >
        {Array.isArray(node.children) && node.children.length > 0
          ? renderTree(node.children)
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
      {renderTree(parameters)}
    </TreeView>
  );
};

export default TreeViewList;

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
 * Builds a tree structure from a flat list of items.
 *
 * @template T The type of the options array elements.
 * @param data - The flat list of items to transform into a tree.
 * @returns The tree structure built from the input items.
 * @example buildTree(items) // returns TreeNode[]
 */
function buildTree<T>(data: Item<T>[]): TreeNode[] {
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
