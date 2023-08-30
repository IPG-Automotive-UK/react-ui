import { Meta, StoryFn } from "@storybook/react";

import DeletableList from "./DeletableList";
import { DeletableListProps } from "./DeletableList.types";
import React from "react";
import { action } from "@storybook/addon-actions";

/**
 * Story metadata
 */
const meta: Meta<typeof DeletableList> = {
  component: DeletableList,
  title: "Lists/DeletableList"
};
export default meta;

// Story Template
const Template: StoryFn<DeletableListProps> = args => {
  const onDelete = (value: string) => {
    action("onDelete")(value);
  };
  return <DeletableList {...args} onDelete={onDelete} />;
};

// Default
export const Default = {
  args: {
    items: ["Apple", "Mango", "Banana"],
    onDelete: () => {}
  },
  render: Template
};
