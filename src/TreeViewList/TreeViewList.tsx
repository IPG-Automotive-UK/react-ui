import {
  FindOrCreateNodeProps,
  Item,
  ParseChildProps,
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
 * @param props - The properties for the tree view list.
 * @property props.items - The items to display in the tree view list.
 * @property props.selected - The ID of the currently selected item.
 * @property props.searchTerm - The term to search for in the items.
 * @property [props.defaultExpanded=[]] - The IDs of the items that should be expanded by default.
 * @property (selection: string) props.onSelectionChange - The function to call when the selection changes.
 * @returns The tree view list component.
 */
const TreeViewList = <T,>({
  items,
  selected,
  searchTerm,
  defaultExpanded = [],
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

  // search function
  const applySearch = (search: string, parameters: Item<T>[]) => {
    const terms = search
      .toUpperCase()
      .trim()
      .split(/(?:\.| )+/);
    return parameters.filter(opt =>
      terms.every(term =>
        typeof opt.name === "string"
          ? opt.name.toUpperCase().includes(term)
          : false
      )
    );
  };
  // build tree nodes
  const parameters = buildParameterTree(
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
 * @returns TreeNode The newly created tree node.
 */
function createNode(
  id: string,
  name: string,
  tooltip: string,
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
 * @param Item<T>[] parameterMapping - The flat list of items to transform into a tree.
 * @returns TreeNode[] The tree structure built from the input items.
 * @example buildParameterTree(items) // returns TreeNode[]
 */
function buildParameterTree<T>(parameterMapping: Item<T>[]): TreeNode[] {
  const itemsTree: TreeNode[] = [];

  // Find or create a node in the tree
  const findOrCreateNode = ({
    nodes,
    id,
    name,
    tooltip = ""
  }: FindOrCreateNodeProps) => {
    let node = nodes.find(n => n.id === id);
    if (!node) {
      node = createNode(id, name, tooltip);
      nodes.push(node);
    }
    return node;
  };

  // Iterate through each item
  parameterMapping.forEach(item => {
    // Start with the root level
    let currentLevelNodes = itemsTree;

    // Iterate through each level
    for (const level in item) {
      if (level.startsWith("level") && item[level]) {
        const node = findOrCreateNode({
          id: item[level] as string,
          name: item.name as string,
          nodes: currentLevelNodes
        });
        currentLevelNodes = node.children;
      }
    }

    // Add characteristic to the last node in the hierarchy
    if (currentLevelNodes !== itemsTree && item.characteristic) {
      parseChild({
        characteristic: item.characteristic as string,
        name: item.name as string,
        nodes: currentLevelNodes,
        tooltip: item.description as string
      });
    }
  });

  return itemsTree;
}

/**
 * Parses a child node and adds it to the provided nodes array.
 *
 * @param  props - The properties for parsing a child node.
 * @property props.nodes - The array of nodes to add the new child node to.
 * @property props.characteristic - The characteristic value of the new child node.
 * @property props.name - The name of the new child node.
 * @property props.tooltip - The tooltip of the new child node.
 */
function parseChild({ nodes, characteristic, name, tooltip }: ParseChildProps) {
  if (!characteristic) return;

  const newId = characteristic;
  const thisNode = createNode(newId, name, tooltip);
  nodes.push(thisNode);
}
