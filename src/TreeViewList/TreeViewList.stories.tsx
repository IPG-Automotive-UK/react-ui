import { Item, TreeViewListProps } from "./TreeViewList.types";

import { Meta } from "@storybook/react";
import React from "react";
import TreeViewList from "./TreeViewList";
import data from "./data.json";

/**
 * Story metadata
 */
const meta: Meta<typeof TreeViewList> = {
  component: TreeViewList,
  title: "Lists/TreeViewList"
};
export default meta;

// Story Template
const Template = <T,>(args: TreeViewListProps<Item<T>>) => {
  return <TreeViewList {...args} width="500px" />;
};

// Default
export const Default = {
  args: {
    items: data
  },
  render: Template
};
