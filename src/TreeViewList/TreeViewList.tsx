import { Box, Tooltip, debounce } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import { TreeNodeItem, TreeViewListProps } from "./TreeViewList.types";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SearchBar from "../SearchBar/SearchBar";

/**
 * A component that renders a tree view list.
 *
 * @param props - The properties for the tree view list.
 * @property props.enableSearch - If true, the search input is displayed. Defaults to false.
 * @property props.expandSearchResults - If true, the tree nodes will be automatically expanded when a search term is entered. Defaults to false.
 * @property props.expandItems - The number of items to expand
 * @property props.items - The items to display in the tree view list.
 * @property props.onNodeSelect - The function to call when a node is selected.
 * @property props.onNodeToggle - The function to call when a node is toggled.
 * @property props.selected - The ID of the currently selected item.
 * @property props.width - The width of the tree view list.
 * @returns The tree view list component.
 */
const TreeViewList = ({
  enableSearch = false,
  expandSearchResults = false,
  expandItems = 1,
  items,
  onNodeSelect,
  onNodeToggle,
  selected,
  width = "100%"
}: TreeViewListProps) => {
  // state for items to display in the tree
  const [treeDisplayItems, setTreeDisplayItems] =
    useState<TreeViewListProps["items"]>(items);

  // state for search input value
  const [searchValue, setSearchValue] = useState("");

  // state for expanded nodes
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

  // state for user expanded nodes
  const [userExpanded, setUserExpanded] = useState<string[]>([]);

  // state for the node we are hovered over
  const [hoveredNode, setHoveredNode] = useState<string>("");

  // update tree display items when the items prop changes or when the search input changes
  useEffect(() => {
    // if search is enabled and the search input is not empty, display only items that match the search terms, otherwise display all items
    if (enableSearch && searchValue !== "") {
      // split the search into individual words and filter out any empty strings
      const searchTerms = searchValue.split(" ").filter(term => term);

      // filter the items to contain only those that match each search term
      let filteredItems = items;
      for (const term of searchTerms) {
        filteredItems = filterBySearchTerm(filteredItems, term);
      }
      setTreeDisplayItems(filteredItems);
    } else {
      setTreeDisplayItems(items);
    }
  }, [enableSearch, items, searchValue]);

  // count the number of last children in the tree
  const countLastChild = (items: TreeNodeItem[]) => {
    let count = 0;

    for (const item of items) {
      // Check if the object has a 'children' property and it's not empty
      if (item.children && item.children.length > 0) {
        // If the object has children, recursively call the function on its children
        count += countLastChild(item.children);
      } else {
        // If the object has no children, it is a last child
        count += 1;
      }
    }

    return count;
  };

  // expand the nodes when the search input changes
  const expandNodes = () => {
    const searchedNodes: string[] = [];
    const expandNodes = (items: TreeNodeItem[]) => {
      // if the number of last children is less than or equal to the expandItems, expand the nodes
      if (countLastChild(items) <= expandItems) {
        for (const item of items) {
          // if the node has children, expand it and call the function on its children
          if (item.children) {
            searchedNodes.push(item.nodeId);
            expandNodes(item.children);
          }
        }
      }
    };
    expandNodes(treeDisplayItems);
    // set the expanded nodes to combine searched nodes and user expanded nodes
    setExpandedNodes([...new Set(searchedNodes.concat(userExpanded))]);
  };

  // debounce the expandNodes function to prevent it from being called too frequently
  const debouncedExpandAllNodes = debounce(expandNodes, 300);

  // if search is enabled and expandSearchResults is true, expand the nodes when the tree display items change
  useEffect(() => {
    if (enableSearch && expandSearchResults && searchValue !== "") {
      debouncedExpandAllNodes();
    }
  }, [
    debouncedExpandAllNodes,
    expandedNodes,
    enableSearch,
    expandSearchResults,
    searchValue
  ]);

  // render the tree nodes with optional tooltips
  const renderTree = (nodes: TreeNodeItem[]) =>
    nodes.map(node => (
      <TooltipTreeItem
        disabled={node.disabled}
        hoveredNode={hoveredNode}
        key={node.nodeId}
        label={node.label}
        nodeId={node.nodeId}
        setHoveredNode={setHoveredNode}
        tooltip={node.tooltip}
      >
        {Array.isArray(node.children) && node.children.length > 0
          ? renderTree(node.children)
          : null}
      </TooltipTreeItem>
    ));

  return (
    <Box sx={{ overflow: "clip", width }}>
      {enableSearch ? (
        <SearchBar
          value={searchValue}
          onChange={event => setSearchValue(event.target.value)}
        />
      ) : null}
      <TreeView
        key={`${searchValue} + ${expandedNodes.length}`} // key to force re-render so that we can reset the expanded nodes when the search input changes but still allow user to expand/collapse nodes
        defaultCollapseIcon={<RemoveIcon />}
        defaultExpandIcon={<AddIcon />}
        defaultExpanded={expandedNodes}
        selected={selected}
        onNodeSelect={(event, nodeId) => {
          const node = getNodeById(treeDisplayItems, nodeId);
          const isChild = Boolean(
            node && (!node.children || node.children.length === 0)
          );
          if (onNodeSelect) {
            const nodeDetails = { isChild };
            onNodeSelect(event, nodeId, nodeDetails);
          }
        }}
        onNodeToggle={(event, nodeId) => {
          setUserExpanded([...nodeId]);
        }}
      >
        {renderTree(treeDisplayItems)}
      </TreeView>
    </Box>
  );
};

/**
 * Recursively finds a node by its ID.
 *
 * @param nodes - The nodes to search.
 * @param nodeId - The ID of the node to find.
 * @returns The node with the specified ID, or null if not found.
 */
const getNodeById = (
  nodes: TreeNodeItem[],
  nodeId: string
): TreeNodeItem | null => {
  for (const node of nodes) {
    if (node.nodeId === nodeId) {
      return node;
    } else if (node.children) {
      const result = getNodeById(node.children, nodeId);
      if (result) {
        return result;
      }
    }
  }
  return null;
};

/**
 * Creates a tree view list item with an optional tooltip.
 *
 * @param props - The properties for the tooltip tree item.
 * @property props.disabled - If true, the tree item is disabled.
 * @property props.label - The label of the tree item.
 * @property props.nodeId - The unique ID of the tree item.
 * @property props.tooltip - The tooltip to display.
 * @returns The tree item wrapped in a tooltip.
 */
const TooltipTreeItem = (
  props: Pick<TreeNodeItem, "disabled" | "label" | "nodeId" | "tooltip"> & {
    children?: React.ReactNode;
    hoveredNode: string;
    setHoveredNode: (nodeId: string) => void;
  }
) => {
  return (
    <Tooltip
      title={props.tooltip ? <>{props.tooltip}</> : ""}
      placement="right-start"
      open={props.hoveredNode === props.nodeId}
    >
      <TreeItem
        {...props}
        sx={theme => ({
          color: theme.palette.text.primary,
          padding: "5px"
        })}
        onMouseOver={event => {
          event.stopPropagation();
          props.setHoveredNode(props.nodeId);
        }}
        onMouseOut={event => {
          event.stopPropagation();
          props.setHoveredNode("");
        }}
      />
    </Tooltip>
  );
};

/**
 * Filter items to contain only those that match the searchTerm
 * @param items - The items to filter.
 * @param searchTerm - The search term to match.
 * @returns The filtered items.
 * @example filterBySearchTerm(items, "search term");
 */
const filterBySearchTerm = (items: TreeNodeItem[], searchTerm: string) => {
  // take a copy of the items array to avoid mutating the original
  const itemsCopy = JSON.parse(JSON.stringify(items)) as TreeNodeItem[];

  // function to check if a node item matches the search term
  const matchesSearch = (node: TreeNodeItem, searchTerm: string) => {
    return node.label.toLowerCase().includes(searchTerm.toLowerCase());
  };

  // interim type to add the active property to the node item
  type TreeNodeItemWithActive = TreeNodeItem & { active?: boolean };

  // function to recursively loop through all node items and check if they match the search term
  const checkNodes = (items: TreeNodeItemWithActive[], searchTerm: string) => {
    for (const item of items) {
      if (matchesSearch(item, searchTerm)) {
        item.active = true;
      } else {
        item.active = false;
      }
      if (item.children) {
        checkNodes(item.children, searchTerm);
      }
    }
  };
  checkNodes(itemsCopy, searchTerm);

  // function to recursively filter out all inactive items, making sure to keep parent items if they have active children
  const removeInactiveItems = (
    items: TreeNodeItemWithActive[]
  ): TreeNodeItemWithActive[] => {
    return items.filter((item: TreeNodeItemWithActive) => {
      // if the item is active, we want to keep it and all its children
      if (item.active) {
        return true;
      }

      // if we have any children, we want to recursively call this function on them and keep the parent if it has any active children left
      if (item.children) {
        item.children = removeInactiveItems(item.children);
        return item.children && item.children.length > 0;
      }

      // otherwise we want to remove it
      return false;
    });
  };
  const filteredItems = removeInactiveItems(itemsCopy);

  // remove the active property from the filtered items
  const removeActiveProperty = (items: TreeNodeItemWithActive[]) => {
    for (const item of items) {
      delete item.active;
      if (item.children) {
        removeActiveProperty(item.children);
      }
    }
    return items;
  };
  removeActiveProperty(filteredItems);

  // return the filtered items
  return filteredItems as TreeNodeItem[];
};

export default TreeViewList;
