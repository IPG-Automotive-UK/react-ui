import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import TransferList from "./TransferList";
import { TransferListItem } from "./TransferList.types";
import { action } from "@storybook/addon-actions";

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

// type for custom object
type CustomTransferListItemType = {
  key: string;
  name: string;
};

// default args for every test
const defaultArgs: StoryObj<typeof TransferList<TransferListItem>>["args"] = {
  sourceListLabel: "Source List Label",
  targetListLabel: "Target List Label"
};

// use a pre-defined object shape sarry with no additional confiuration
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
    ]
  },

  render: TransferList
};

// use an array of strings with pre-transferred items
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
      ],
      targetListKeys: ["Apples", "Grapes"]
    },
    render: TransferList
  };

// use a custom object shape array with filterKey and itemLabel configurations
export const WithCustomObjectArray: StoryObj<
  typeof TransferList<CustomTransferListItemType>
> = {
  args: {
    ...defaultArgs,
    filterKey: item => item.key,
    itemLabel: item => item.name,
    items: [
      { key: "A", name: "Apples" },
      { key: "P", name: "Pears" },
      { key: "O", name: "Oranges" },
      { key: "B", name: "Bananas" },
      { key: "M", name: "Mangoes" },
      { key: "K", name: "Kiwi" },
      { key: "D", name: "Dragonfruit" },
      { key: "Pl", name: "Plum" },
      { key: "G", name: "Grapes" },
      { key: "C", name: "Cherry" }
    ],
    sourceListLabel: "Source List Label",
    targetListKeys: ["C", "K"],
    targetListLabel: "Target List Label"
  },

  render: TransferList
};

// controlled component that calls the handleTransfer callback with data
export const Controlled: StoryObj<typeof TransferList<TransferListItem>> = {
  args: {
    ...defaultArgs,
    handleTransfer: (data, intent) => action("handleTransfer")(data, intent),
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
    ],
    targetListKeys: ["Apples", "Grapes"]
  },
  render: TransferList
};
