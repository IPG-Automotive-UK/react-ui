import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import TreeViewList from "./TreeViewList";
import { TreeViewListProps } from "./TreeViewList.types";
import items from "./example-items.json";
import { useArgs } from "@storybook/preview-api";

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
  // useArgs is a hook that returns the current state of the args object
  const [{ selected }, updateArgs] = useArgs<TreeViewListProps>();

  // update the args object with the new value value
  React.useEffect(() => {
    updateArgs({ selected });
  }, [selected, updateArgs]);

  return <TreeViewList {...args} selected={selected} />;
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
    width: "90%"
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
