import { Meta, StoryFn, StoryObj } from "@storybook/react";

import React from "react";
import TransferList from "./TransferList";
import { TransferListProps } from "./TransferList.types";
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

const TransferListWithState: StoryFn<TransferListProps> = () => {
  const [targetKeys, setTargetKeys] = React.useState<string[]>([]);

  // Create function to transfer items
  const handleChange: TransferListProps["handleChange"] = value => {
    // Move list items in state based on intent
    setTargetKeys(value);
    action("handleChange")(value);
  };

  return (
    <TransferList
      sourceListLabel={"Source List Label"}
      targetListLabel={"Target List Label"}
      selectedItems={targetKeys}
      items={[
        { key: "Apples", primaryLabel: "Apples" },
        { key: "Pears", primaryLabel: "Pears", secondaryLabel: "Conference" },
        { key: "Oranges", primaryLabel: "Oranges" },
        {
          key: "Bananas",
          primaryLabel: "Bananas",
          secondaryLabel: "Blue Java"
        },
        { key: "Mangoes", primaryLabel: "Mangoes" },
        { key: "Kiwi", primaryLabel: "Kiwi" },
        { key: "Dragonfruit", primaryLabel: "Dragonfruit" },
        { key: "Plum", primaryLabel: "Plum" },
        { key: "Grapes", primaryLabel: "Grapes" },
        { key: "Cherry", primaryLabel: "Cherry" }
      ]}
      handleChange={handleChange}
    />
  );
};

// default args for every test
const defaultArgs: StoryObj<typeof TransferList>["args"] = {
  sourceListLabel: "Source List Label",
  targetListLabel: "Target List Label"
};

// use a pre-defined object shape array with no additional configuration
export const WithDefaultObjectArray: StoryObj<typeof TransferList> = {
  args: {
    ...defaultArgs,
    items: [
      { key: "Apples", primaryLabel: "Apples" },
      { key: "Pears", primaryLabel: "Pears", secondaryLabel: "Conference" },
      { key: "Oranges", primaryLabel: "Oranges" },
      { key: "Bananas", primaryLabel: "Bananas", secondaryLabel: "Blue Java" },
      { key: "Mangoes", primaryLabel: "Mangoes" },
      { key: "Kiwi", primaryLabel: "Kiwi" },
      { key: "Dragonfruit", primaryLabel: "Dragonfruit" },
      { key: "Plum", primaryLabel: "Plum" },
      { key: "Grapes", primaryLabel: "Grapes" },
      { key: "Cherry", primaryLabel: "Cherry" }
    ]
  },

  render: TransferList
};

// use an array of strings with pre-transferred items
export const WithStringArray: StoryObj<typeof TransferList> = {
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
    selectedItems: ["Apples", "Grapes"]
  },
  render: TransferList
};

// use a pre-defined object shape sarry with no additional confiuration
export const WithSecondaryLabel: StoryObj<typeof TransferList> = {
  args: {
    ...defaultArgs,
    items: [
      { key: "Apples", primaryLabel: "Apples", secondaryLabel: "Granny Smith" },
      { key: "Pears", primaryLabel: "Pears", secondaryLabel: "Conference" },
      { key: "Oranges", primaryLabel: "Oranges", secondaryLabel: "Jaffa" },
      { key: "Bananas", primaryLabel: "Bananas", secondaryLabel: "Blue Java" },
      { key: "Mangoes", primaryLabel: "Mangoes", secondaryLabel: "Alphonso" },
      { key: "Kiwi", primaryLabel: "Kiwi", secondaryLabel: "Golden" },
      { key: "Dragonfruit", primaryLabel: "Dragonfruit" },
      { key: "Plum", primaryLabel: "Plum" },
      { key: "Grapes", primaryLabel: "Grapes", secondaryLabel: "Mixed" },
      { key: "Cherry", primaryLabel: "Cherry", secondaryLabel: "Black" }
    ]
  },

  render: TransferList
};

// controlled component that calls the handleChange callback with data
export const Controlled: StoryObj<typeof TransferList> = {
  render: TransferListWithState
};
