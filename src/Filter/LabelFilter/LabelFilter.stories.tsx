import { Label } from "../../LabelSelector/Label.types";
import LabelFilter from "./LabelFilter";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: LabelFilter,
  title: "Filters/LabelFilter"
};

// example options
const options = [
  { _id: "1", color: "#005FA8", description: "first label", name: "label 1" },
  { _id: "2", color: "#f542e0", description: "second label", name: "label 2" },
  { _id: "3", color: "#ffa500", description: "third label", name: "label 3" }
];

// story template with state for selection
const Template = args => {
  const [value, setValue] = React.useState(args.value);
  React.useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  const onChange = (value: Label[]) => {
    setValue(value);
    action("onChange")(value);
  };
  return <LabelFilter {...args} onChange={onChange} value={value} />;
};

export const Default = {
  args: {
    label: "Select options",
    limitTags: -1,
    name: "label-filter",
    options,
    value: [options[0]]
  },

  render: Template
};
