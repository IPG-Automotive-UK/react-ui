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
  const handleTransfer: TransferListProps["handleTransfer"] = (
    newKeys,
    intent
  ) => {
    // Move list items in state based on intent
    if (intent === "toTarget") {
      setTargetKeys([...newKeys, ...targetKeys]);
    } else {
      setTargetKeys(targetKeys.filter(key => !newKeys.includes(key)));
    }
    action("handleTransfer")(newKeys, intent);
  };

  return (
    <TransferList
      sourceListLabel={"Source List Label"}
      targetListLabel={"Target List Label"}
      targetListKeys={targetKeys}
      items={[
        { id: "Apples", primaryLabel: "Apples" },
        { id: "Pears", primaryLabel: "Pears", secondaryLabel: "Conference" },
        { id: "Oranges", primaryLabel: "Oranges" },
        { id: "Bananas", primaryLabel: "Bananas", secondaryLabel: "Blue Java" },
        { id: "Mangoes", primaryLabel: "Mangoes" },
        { id: "Kiwi", primaryLabel: "Kiwi" },
        { id: "Dragonfruit", primaryLabel: "Dragonfruit" },
        { id: "Plum", primaryLabel: "Plum" },
        { id: "Grapes", primaryLabel: "Grapes" },
        { id: "Cherry", primaryLabel: "Cherry" }
      ]}
      handleTransfer={handleTransfer}
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
      { id: "Apples", primaryLabel: "Apples" },
      { id: "Pears", primaryLabel: "Pears", secondaryLabel: "Conference" },
      { id: "Oranges", primaryLabel: "Oranges" },
      { id: "Bananas", primaryLabel: "Bananas", secondaryLabel: "Blue Java" },
      { id: "Mangoes", primaryLabel: "Mangoes" },
      { id: "Kiwi", primaryLabel: "Kiwi" },
      { id: "Dragonfruit", primaryLabel: "Dragonfruit" },
      { id: "Plum", primaryLabel: "Plum" },
      { id: "Grapes", primaryLabel: "Grapes" },
      { id: "Cherry", primaryLabel: "Cherry" }
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
    targetListKeys: ["Apples", "Grapes"]
  },
  render: TransferList
};

// use a pre-defined object shape sarry with no additional confiuration
export const WithSecondaryLabel: StoryObj<typeof TransferList> = {
  args: {
    ...defaultArgs,
    items: [
      { id: "Apples", primaryLabel: "Apples", secondaryLabel: "Granny Smith" },
      { id: "Pears", primaryLabel: "Pears", secondaryLabel: "Conference" },
      { id: "Oranges", primaryLabel: "Oranges", secondaryLabel: "Jaffa" },
      { id: "Bananas", primaryLabel: "Bananas", secondaryLabel: "Blue Java" },
      { id: "Mangoes", primaryLabel: "Mangoes", secondaryLabel: "Alphonso" },
      { id: "Kiwi", primaryLabel: "Kiwi", secondaryLabel: "Golden" },
      { id: "Dragonfruit", primaryLabel: "Dragonfruit" },
      { id: "Plum", primaryLabel: "Plum" },
      { id: "Grapes", primaryLabel: "Grapes", secondaryLabel: "Mixed" },
      { id: "Cherry", primaryLabel: "Cherry", secondaryLabel: "Black" }
    ]
  },

  render: TransferList
};

// controlled component that calls the handleTransfer callback with data
export const Controlled: StoryObj<typeof TransferList> = {
  render: TransferListWithState
};
