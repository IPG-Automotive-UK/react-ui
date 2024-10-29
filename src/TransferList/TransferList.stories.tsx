import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import TransferList from "./TransferList";
import { TransferListItem } from "./TransferList.types";

/**
 * Story metadata
 */
const meta: Meta<typeof TransferList> = {
  component: TransferList,
  decorators: Story => (
    <div style={{ height: "400px" }}>
      <Story />
    </div>
  ),
  title: "Lists/TransferList"
};
export default meta;

type CustomTransferListItemType = {
  key: string;
  name: string;
};

const defaultArgs: StoryObj<typeof TransferList<TransferListItem>>["args"] = {
  sourceListLabel: "Source List Label",
  targetListLabel: "Target List Label"
};

export const WithDefaultObjectArray: StoryObj<
  typeof TransferList<TransferListItem>
> = {
  args: {
    ...defaultArgs,
    items: [
      { id: "Apples", label: "Apples" },
      { id: "Pears", label: "Pears" },
      { id: "Oranges", label: "Oranges" },
      { id: "Bananas", label: "Bananas" },
      { id: "Mangoes", label: "Mangoes" },
      { id: "Kiwi", label: "Kiwi" },
      { id: "Dragonfruit", label: "Dragonfruit" },
      { id: "Plum", label: "Plum" },
      { id: "Grapes", label: "Grapes" },
      { id: "Cherry", label: "Cherry" }
    ],
    selectedItems: ["Apples"],
    sourceListLabel: "Source List Label",
    targetListLabel: "Target List Label"
  },

  render: TransferList
};

export const WithCustomObjectArray: StoryObj<
  typeof TransferList<CustomTransferListItemType>
> = {
  args: {
    ...defaultArgs,
    filterKey: item => item.key,
    itemLabel: item => item.name,
    items: [
      { key: "Apples", name: "Apples" },
      { key: "Pears", name: "Pears" },
      { key: "Oranges", name: "Oranges" },
      { key: "Bananas", name: "Bananas" },
      { key: "Mangoes", name: "Mangoes" },
      { key: "Kiwi", name: "Kiwi" },
      { key: "Dragonfruit", name: "Dragonfruit" },
      { key: "Plum", name: "Plum" },
      { key: "Grapes", name: "Grapes" },
      { key: "Cherry", name: "Cherry" }
    ],
    selectedItems: ["Apples"],
    sourceListLabel: "Source List Label",
    targetListLabel: "Target List Label"
  },

  render: TransferList
};

export const WithStringArray: StoryObj<typeof TransferList<TransferListItem>> =
  {
    args: {
      ...defaultArgs,
      items: [
        "Apples",
        "Pears",
        "Oranges",
        "Bananas",
        "Mangoes",
        "Kiwi",
        "Dragonfruit",
        "Plum",
        "Grapes",
        "Cherry"
      ]
    },
    render: TransferList
  };
