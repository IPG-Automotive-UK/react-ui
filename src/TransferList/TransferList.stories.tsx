import { Meta, StoryFn } from "@storybook/react";

import { Box } from "@mui/material";
import React from "react";
import TransferList from "./TransferList";
import { TransferListProps } from "./TransferList.types";
import { action } from "@storybook/addon-actions";

/**
 * Story metadata
 */
const meta: Meta<typeof TransferList> = {
  component: TransferList,
  title: "Lists/TransferList"
};
export default meta;

const Template: StoryFn<TransferListProps> = args => {
  // local state for selected items
  const [selectedItems, setSelectedItems] = React.useState(["Apples"]);
  React.useEffect(() => {
    setSelectedItems(args.selectedItems);
  }, [args.selectedItems]);
  const onChange = newItems => {
    setSelectedItems(newItems);
    action("onChange")(newItems);
  };

  return (
    <Box sx={{ height: 200 }}>
      <TransferList
        {...args}
        selectedItems={selectedItems}
        onChange={onChange}
      />
    </Box>
  );
};

export const Default = {
  args: {
    items: ["Apples", "Pears", "Oranges", "Banana", "Mangoes"],
    onChange: () => {},
    selectedItems: ["Apples"]
  },

  render: Template
};
