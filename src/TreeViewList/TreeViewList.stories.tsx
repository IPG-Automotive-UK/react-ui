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
  return <TreeViewList {...args} width="500px" />;
};

// Default
export const Default = {
  args: {
    items
  },
  render: Template
};
