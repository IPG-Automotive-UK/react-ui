import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import TreeViewList from "./TreeViewList";
import { TreeViewListProps } from "./TreeViewList.types";
import items from "./example-items.json";

/**
 * Story metadata
 */
const meta: Meta<typeof TreeViewList> = {
  component: TreeViewList,
  title: "Lists/TreeViewList"
};
export default meta;

// Story Template
const Template: StoryFn<TreeViewListProps> = args => {
  return <TreeViewList {...args} />;
};

// Default
export const Default = {
  args: {
    enableSearch: false,
    expandItems: 1,
    expandSearchResults: false,
    items,
    selected: "",
    width: "100%"
  },
  render: Template
};

// With Search
export const WithSearch = {
  args: {
    enableSearch: true,
    expandItems: 1,
    expandSearchResults: true,
    items,
    selected: "",
    width: "100%"
  },
  render: Template
};

// With Custom width
export const SelectedNode = {
  args: {
    enableSearch: true,
    expandItems: 1,
    expandSearchResults: true,
    items,
    selected: "SUS.Axle.WheelBase",
    width: "90%px"
  },
  render: Template
};

// With Custom width
export const CustomWidth = {
  args: {
    enableSearch: true,
    expandItems: 1,
    expandSearchResults: true,
    items,
    selected: "",
    width: "400px"
  },
  render: Template
};

// With Custom Height
export const CustomHeight = {
  args: {
    enableSearch: true,
    expandItems: 1,
    expandSearchResults: true,
    height: "400px",
    items,
    selected: "",
    width: "50%"
  },
  render: Template
};
