import { Box, Typography, alpha, debounce } from "@mui/material";
import {
  IsParentOrSelfDisabledInput,
  TreeNodeItem,
  TreeViewListProps
} from "./TreeViewList.types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";

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
 * @property props.height - The height of the tree view list.
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
  height = "100%",
  width = "100%"
}: TreeViewListProps) => {
  // state for items to display in the tree
  const [treeDisplayItems, setTreeDisplayItems] =
    useState<TreeViewListProps["items"]>(items);

  // state for selected node
  const [selectedNode, setSelectedNode] = useState<string>(selected ?? "");

  // local state for selected node
  const [currentSelection, setCurrentSelection] = useState(selected ?? "");

  // state for search input value
  const [searchValue, setSearchValue] = useState("");

  // state for expanded nodes
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

  // state for user expanded nodes
  const [userExpanded, setUserExpanded] = useState<string[]>([]);

  // state for the node we are hovered over
  const [hoveredNode, setHoveredNode] = useState<string>("");

  // state for the selectedChilds
  const [selectedChildIds, setSelectedChildIds] = useState<string[]>([]);

  // reference to the box element
  const boxRef = useRef<HTMLDivElement>(null);
  const [boxWidth, setBoxWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (boxRef.current) {
        setBoxWidth(boxRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", updateWidth);
    updateWidth();

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [width]);

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
  const countLastChild = useCallback((items: TreeNodeItem[]) => {
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
  }, []);

  // expand the nodes when the search input changes
  const expandNodes = useCallback(() => {
    // use a Set to store the searched nodes to prevent duplicates
    const searchedNodes = new Set<string>();

    const expandChildNodes = (items: TreeNodeItem[]) => {
      // If the condition is not met for the entire items array, return early
      if (countLastChild(items) > expandItems) {
        // reset the searched nodes array
        searchedNodes.clear();
        return;
      }

      // if the number of last children is less than or equal to the expandItems, expand the nodes
      if (countLastChild(items) <= expandItems) {
        for (const item of items) {
          // if the node has children, expand it and call the function on its children
          if (item.children) {
            searchedNodes.add(item.id);
            expandChildNodes(item.children);
          }
        }
      }
    };

    // recursively expand the child nodes
    expandChildNodes(treeDisplayItems);

    // update the expanded nodes with the searched nodes
    setExpandedNodes(prevState => {
      const merged = new Set([...prevState, ...searchedNodes]);
      return Array.from(merged);
    });
  }, [countLastChild, expandItems, treeDisplayItems]);

  // update the expanded nodes when the user expanded nodes change or when the search input changes
  useEffect(() => {
    if (searchValue !== "") {
      // if the search input is not empty, update expanded nodes with the user expanded nodes
      setExpandedNodes(prevState => [...prevState, ...userExpanded]);
    } else {
      // if the search input is empty, update expanded nodes with the user expanded nodes
      setExpandedNodes(userExpanded);
    }
  }, [userExpanded, searchValue]);

  // debounce the expandNodes function to prevent it from being called too frequently
  const debouncedExpandAllNodes = useCallback(
    () => debounce(expandNodes, 100)(),
    [expandNodes]
  );

  useEffect(() => {
    if (enableSearch && expandSearchResults && searchValue !== "") {
      debouncedExpandAllNodes();
    } else {
      // if enableSearch is false and expandSearchResults is false, searchValue is empty, and there isn't a selectedNode update the expanded nodes with the user expanded nodes
      if (selectedNode === "") {
        setExpandedNodes(userExpanded);
      }
    }
  }, [
    userExpanded,
    debouncedExpandAllNodes,
    enableSearch,
    expandSearchResults,
    searchValue,
    selectedNode
  ]);

  // update the selected node when the selected prop changes
  useEffect(() => {
    // if the selected node is not empty, update the selected node
    if (selected) {
      setSelectedNode(selected);
    }
  }, [selected]);

  // update the expanded nodes when the selected node changes
  useEffect(() => {
    if ((selectedNode && searchValue !== "") || selected === selectedNode) {
      // update the expanded nodes when the selected node changes
      const parentNodeIds = findPathToNodeId(items, selectedNode);

      // update the expanded nodes with the parent node ids
      setExpandedNodes(prev => [...prev, ...parentNodeIds]);
    }
  }, [items, selectedNode, searchValue, selected]);

  // render the tree nodes
  const renderTree = (nodes: TreeNodeItem[]) =>
    nodes.map(node => (
      <TooltipTreeItem
        disabled={node.disabled}
        hoveredNode={hoveredNode}
        key={node.id}
        name={node.name}
        id={node.id}
        setHoveredNode={setHoveredNode}
      >
        {Array.isArray(node.children) && node.children.length > 0
          ? renderTree(node.children)
          : null}
      </TooltipTreeItem>
    ));

  // function to check if the click happened on the expand/collapse icon
  const isClickOnExpandIcon = (target: HTMLElement): boolean => {
    return (
      target.closest(".MuiTreeItem-iconContainer") !== null ||
      target.classList.contains("MuiTreeItem-iconContainer")
    );
  };

  return (
    <>
      <Box
        ref={boxRef}
        sx={theme => ({
          background: theme.palette.background.paper,
          display: "flex",
          flexDirection: "column",
          height,
          overflow: "hidden",
          width
        })}
      >
        <Box sx={{ flexShrink: 0 }}>
          <Box
            sx={theme => ({
              background: theme.palette.background.paper,
              marginRight: 0.2,
              position: "sticky",
              top: 0,
              zIndex: 2
            })}
          >
            {/* Additional layer to block content behind */}
            <Box
              sx={theme => ({
                background: theme.palette.background.paper, // Matching background color
                height: "100%",
                left: 0,
                position: "absolute",
                right: 0,
                top: 0,
                zIndex: -1 // Behind the sticky box content
              })}
            ></Box>
            {enableSearch ? (
              <Box sx={{ py: 2 }}>
                <SearchBar
                  value={searchValue}
                  onChange={event => {
                    setSelectedNode("");
                    setSearchValue(event.target.value);
                  }}
                />
              </Box>
            ) : null}
          </Box>
        </Box>
        <Box
          sx={{ flexGrow: 1, overflowY: "auto" }}
          data-selected-ids={JSON.stringify(selectedChildIds)}
        >
          <SimpleTreeView
            sx={{
              "& .css-9l5vo-MuiCollapse-wrapperInner": {
                width: boxWidth <= 280 ? "auto" : "100%"
              }
            }}
            expansionTrigger="iconContainer"
            slots={{ collapseIcon: RemoveIcon, expandIcon: AddIcon }}
            expandedItems={expandedNodes}
            selectedItems={currentSelection}
            onSelectedItemsChange={(event, nodeId) => {
              const target = event.target as HTMLElement;

              // prevent selection if clicking on the expand/collapse icon
              if (isClickOnExpandIcon(target)) return;

              // exit early if nodeId is not provided
              if (!nodeId) return;

              // find the clicked node using its ID
              const node = getNodeById(treeDisplayItems, nodeId);

              // return if the node itself is disabled OR has a disabled parent
              if (
                !node ||
                node.disabled ||
                isParentOrSelfDisabled({
                  nodeId,
                  nodes: treeDisplayItems
                })
              ) {
                event.preventDefault();
                event.stopPropagation();
                return;
              }

              // initialize an empty array to store selected node IDs
              let ids: string[] = [];

              // if the clicked node has children, get only enabled descendant IDs
              if (node.children?.length) {
                ids = getAllLeafDescendantIds(node).filter(
                  // Ensures no disabled IDs get selected
                  childId =>
                    !isParentOrSelfDisabled({
                      nodeId: childId,
                      nodes: treeDisplayItems
                    })
                );
              } else {
                // selects only if it's an enabled leaf node
                ids = [nodeId];
              }

              // set selectedNode
              setSelectedNode(nodeId);
              setCurrentSelection(nodeId);

              // call external selection handler with only valid IDs
              if (onNodeSelect) {
                const isChild = !node.children || node.children.length === 0;
                const nodeDetails = { isChild };
                onNodeSelect(event, ids, nodeDetails, node);

                // update the state with the selected child IDs
                setSelectedChildIds(ids);
              }
            }}
            onExpandedItemsChange={(event, nodeId) => {
              // reset the selected node when a node is toggled
              setSelectedNode("");
              // update the user expanded nodes when a node is toggled
              setUserExpanded(nodeId);
              // update the expanded nodes when a node is toggled
              setExpandedNodes(nodeId);
              // call the onNodeToggle function if it is defined
              if (onNodeToggle) {
                setSelectedNode(selectedNode);
                onNodeToggle(event, nodeId);
              }
            }}
          >
            {renderTree(treeDisplayItems)}
            {items.length > 0 && treeDisplayItems.length === 0 && (
              <Typography
                data-testid="none-selected"
                sx={{ color: theme => theme.palette.grey[500], pl: 0.5 }}
              >
                No search results.
              </Typography>
            )}
            {items.length === 0 && (
              <Typography
                data-testid="none-selected"
                sx={{ color: theme => theme.palette.grey[500], pl: 0.5 }}
              >
                No data is available.
              </Typography>
            )}
          </SimpleTreeView>
        </Box>
      </Box>
    </>
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
    if (node.id === nodeId) {
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
  props: Pick<TreeNodeItem, "disabled" | "name" | "id"> & {
    children?: React.ReactNode;
    hoveredNode: string;
    setHoveredNode: (nodeId: string) => void;
  }
) => {
  const { hoveredNode, setHoveredNode, id, name, disabled, ...rest } = props;

  return (
    <TreeItem
      {...rest}
      label={name}
      itemId={id}
      sx={theme => ({
        // apply color change to icon when disabled
        "& .MuiTreeItem-iconContainer": {
          color: disabled
            ? theme.palette.text.disabled
            : theme.palette.text.primary,
          pointerEvents: "auto"
        },
        "& .MuiTreeItem-label": {
          color: disabled
            ? theme.palette.text.disabled
            : theme.palette.text.primary,
          cursor: disabled ? "" : "pointer",
          margin: 0,
          opacity: disabled ? 0.6 : 1,
          padding: "2px 2px"
        },

        "& .MuiTreeItem-root": {
          borderLeft: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
          marginLeft: "4px"
        }
      })}
    />
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
    return node.name.toLowerCase().includes(searchTerm.toLowerCase());
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

/**
 * Recursively find the path from the root to the given nodeId
 * @param items - The items to search.
 * @param nodeId - The node id to find.
 * @returns The path from the root to the node id.
 * @example findPathToNodeId(items, "node_id");
 */
const findPathToNodeId = (
  items: TreeNodeItem[],
  nodeId: string | string[]
): string[] => {
  for (const item of items) {
    if (item.id === nodeId) {
      // if the current item is the one we're looking for, return an array containing only its id
      return [item.id];
    }

    if (item.children) {
      // if the current item has children, recursively call this function on them
      const pathFromChild = findPathToNodeId(item.children, nodeId);

      if (pathFromChild.length > 0) {
        // if we found the node in the children, return an array containing the id of the current item and the path from the child
        return [item.id, ...pathFromChild];
      }
    }
  }

  // if no node found, return an empty array
  return [];
};

/**
 * Recursively retrieves all leaf node IDs from a given tree node.
 * A leaf node is defined as a node that has no children.
 * @param {TreeNodeItem} node - The tree node from which to collect leaf descendant IDs.
 * @returns {string[]} An array of leaf node IDs.
 */
export const getAllLeafDescendantIds = (node: TreeNodeItem): string[] => {
  if (!node.children || node.children.length === 0) {
    // return only if it's a leaf node
    return [node.id];
  }

  // recursive case: flatten results from all child nodes.
  return node.children.flatMap(getAllLeafDescendantIds);
};

/**
 * Recursively checks whether a node or any of its ancestors are disabled.
 *
 * This function traverses through the tree of nodes to determine if a given node
 * (identified by its `nodeId`) or any of its ancestor nodes has the `disabled` property set to `true`.
 * It considers the `parentDisabled` flag which propagates the disabled state through parent nodes.
 *
 * @param nodes - An array of `TreeNodeItem` objects representing the tree of nodes.
 * @param nodeId - The ID of the node to check.
 * @param parentDisabled - A boolean indicating whether the parent node is disabled. Defaults to `false`.
 * @returns A boolean indicating whether the specified node or any of its ancestors is disabled.
 */
export const isParentOrSelfDisabled = ({
  nodes,
  nodeId,
  parentDisabled = false
}: IsParentOrSelfDisabledInput): boolean => {
  for (const node of nodes) {
    // if the current node matches, return whether it's disabled or has a disabled ancestor
    if (node.id === nodeId) return parentDisabled || !!node.disabled;

    // if the node has children, recursively check them
    if (node.children?.length) {
      if (
        isParentOrSelfDisabled({
          nodeId,
          nodes: node.children,
          parentDisabled: parentDisabled || !!node.disabled
        })
      ) {
        return true;
      }
    }
  }
  return false;
};

export default TreeViewList;
