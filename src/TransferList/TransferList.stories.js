import { Box } from "@mui/material";
import React from "react";
import TransferList from "./TransferList";
import { action } from "@storybook/addon-actions";

export default {
  component: TransferList,
  title: "General/TransferList"
};
const Template = args => {
  // local state for selected items
  const [selectedItems, setSelectedItems] = React.useState(["Apples"]);
  React.useEffect(
    newItems => {
      setSelectedItems(args.selectedItems);
    },
    [args.selectedItems]
  );
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
  render: Template,

  args: {
    items: ["Apples", "Pears", "Oranges", "Banana", "Mangoes"],
    selectedItems: ["Apples"]
  }
};
