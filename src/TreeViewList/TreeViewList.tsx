import React, { useEffect, useState } from "react";
import {
  TooltipTreeItemProps,
  TreeNodeItem,
  TreeViewListProps
} from "./TreeViewList.types";
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
 * @property props.expandSearchTerm - Whether to expand the tree when searching.
 * @property props.width - The width of the tree view list.
 * @property props.onSelectionChange - The function to call when the selection changes.
 * @returns The tree view list component.
 */
const TreeViewList = ({
  items,
  selected,
  searchTerm = "",
  defaultExpanded = [],
  expandSearchTerm = false,
  width,
  onSelectionChange
}: TreeViewListProps) => {
  // state for expanded nodes
  const [expanded, setExpanded] = useState(defaultExpanded);

  // state for items to display in the tree
  const [treeDisplayItems, setTreeDisplayItems] =
    useState<TreeViewListProps["items"]>(items);

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
  const renderTree = (nodes: TreeNodeItem[], hasParent = false) =>
    nodes.map(node => (
      <TooltipTreeItem
        key={node.name}
        nodeId={node.name}
        label={node.name}
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
      {renderTree(treeDisplayItems)}
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

export default TreeViewList;
