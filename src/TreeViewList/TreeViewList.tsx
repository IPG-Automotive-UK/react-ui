import {
  ChildData,
  Item,
  TooltipTreeItemProps,
  TreeNode,
  TreeViewListProps
} from "./TreeViewList.types";
import React, { useCallback, useEffect, useState } from "react";
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

  // recursive search function
  const applySearch = (search: string, parameters: Item<T>[]): Item<T>[] => {
    // Split the search string into individual terms for comparison
    const terms = search.toLowerCase().trim().split(" ");

    // Function to recursively search and filter the items
    const filterItems = (items: Item<T>[]): Item<T>[] => {
      return items.reduce((acc: Item<T>[], item) => {
        const itemName = (item.name as string)?.trim().toLowerCase() || "";

        // Check if the item name matches any of the search terms as whole words
        let matches = terms.some(term => {
          const regex = new RegExp(`\\b${term}\\b`, "i"); // \b is a word boundary in regex
          return regex.test(itemName);
        });

        // If there are children, recursively filter them
        if (Array.isArray(item.children) && item.children.length > 0) {
          const filteredChildren = filterItems(item.children);

          // If any children match, include this item in the result
          if (filteredChildren.length > 0) {
            matches = true;
            // Update the item with the filtered children
            item = { ...item, children: filteredChildren as T };
          }
        }

        // If this item or any of its children match, add it to the accumulator
        if (matches) {
          acc.push(item);
        }

        return acc;
      }, []);
    };

    return filterItems(parameters);
  };

  // build tree nodes
  const parameters = buildTree(
    searchTerm !== undefined && searchTerm !== ""
      ? applySearch(searchTerm, items)
      : items
  );

  // search tree callback
  const searchTreeCallback = useCallback(() => {
    return searchTree(parameters, searchTerm);
  }, [parameters, searchTerm]);

  // expand nodes that match the search term
  useEffect(() => {
    if (expandSearchTerm) {
      // Reset expanded ids
      setExpanded([]);

      // if the search term is not empty, get the ids of the matching nodes and set them as expanded
      if (searchTerm !== "") {
        const ids = searchTreeCallback();
        setExpanded(ids);
      }
    }
  }, [expandSearchTerm, searchTerm, searchTreeCallback]);

  const renderTree = (nodes: TreeNode[], hasParent = false) =>
    nodes.map(node => (
      <TooltipTreeItem
        key={node.id}
        nodeId={node.id}
        label={node.id}
        tooltip={node.tooltip ? node.tooltip : ""}
        node={node}
        hasParent={hasParent}
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

/**
 * Searches a tree for nodes that match the given search term.
 *
 * @param nodes - The nodes to search.
 * @param term - The term to search for.
 * @param isChildSearch - Weather we are searching within child nodes.
 * @returns The IDs of the nodes that match the search term.
 */
const searchTree = (
  nodes: TreeNode[],
  term: string,
  isChildSearch: boolean = false // Additional parameter to indicate if we are searching within child nodes
): string[] => {
  let result: string[] = [];
  const terms = term.toLowerCase().split(" "); // Convert term to lower case and split into words

  nodes.forEach(node => {
    const nodeNameLower = node.name.toLowerCase(); // Convert node name to lower case
    const nodeMatched = terms.some(t => nodeNameLower.includes(t));

    // If the current node matches, or if we're in a child search and there's a match in children, add the node ID
    if (nodeMatched || isChildSearch) {
      result.push(node.id);
    }

    // If the node has children, search them too
    if (node.children) {
      const childResult = searchTree(node.children, term, true);
      // If there's a match in children, ensure the parent node is included for expansion
      if (childResult.length > 0 && !nodeMatched) {
        result.push(node.id);
      }
      // Concatenate the child results (which includes only matching children and their parents)
      result = result.concat(childResult);
    }
  });

  // Remove duplicates and return
  return Array.from(new Set(result));
};
