import React from "react";
import TransferList from "./TransferList";
import { action } from "@storybook/addon-actions";

export default {
  component: TransferList,
  title: "General/TransferList"
};
const Template = args => {
  const items = ["Apples", "Pears", "Oranges"];
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
    <TransferList
      {...args}
      items={items}
      selectedItems={selectedItems}
      onChange={onChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  items: ["Apples", "Pears", "Oranges"],
  selectedItems: ["Apples"]
};
