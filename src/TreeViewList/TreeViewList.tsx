import React, { useEffect, useState } from "react";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import { TreeNodeItem, TreeViewListProps } from "./TreeViewList.types";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Tooltip } from "@mui/material";

/**
 * A component that renders a tree view list.
 *
 * @param props - The properties for the tree view list.
 * @property props.items - The items to display in the tree view list.
 * @property props.onNodeSelect - The function to call when a node is selected.
 * @property props.selected - The ID of the currently selected item.
 * @property props.width - The width of the tree view list.
 * @returns The tree view list component.
 */
const TreeViewList = ({
  items,
  onNodeSelect,
  selected,
  width
}: TreeViewListProps) => {
  // state for items to display in the tree
  const [treeDisplayItems, setTreeDisplayItems] =
    useState<TreeViewListProps["items"]>(items);

  // update tree display items when the items prop changes
  useEffect(() => {
    setTreeDisplayItems(items);
  }, [items]);

  // render the tree nodes with optional tooltips
  const renderTree = (nodes: TreeNodeItem[]) =>
    nodes.map(node => (
      <TooltipTreeItem
        disabled={node.disabled}
        key={node.nodeId}
        label={node.label}
        nodeId={node.nodeId}
        tooltip={node.tooltip}
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
      selected={selected}
      onNodeSelect={onNodeSelect}
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
 * @property props.disabled - If true, the tree item is disabled.
 * @property props.label - The label of the tree item.
 * @property props.nodeId - The unique ID of the tree item.
 * @property props.tooltip - The tooltip to display.
 * @returns The tree item wrapped in a tooltip.
 */
const TooltipTreeItem = (
  props: Pick<TreeNodeItem, "disabled" | "label" | "nodeId" | "tooltip"> & {
    children?: React.ReactNode;
  }
) => {
  return (
    <Tooltip
      disableFocusListener
      title={props.tooltip ? <>{props.tooltip}</> : ""}
      placement="right"
    >
      <TreeItem
        {...props}
        sx={theme => ({
          color: theme.palette.text.primary,
          padding: "5px"
        })}
      />
    </Tooltip>
  );
};

export default TreeViewList;
