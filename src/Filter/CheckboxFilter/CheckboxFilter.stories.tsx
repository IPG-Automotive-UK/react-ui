import CheckboxFilter from "./CheckboxFilter";
import React from "react";

export default {
  component: CheckboxFilter,
  title: "Filters/CheckboxFilter"
};

// story template with state for selection
const Template = args => {
  const [value, setValue] = React.useState(args.value);

  // onChange handler for the Checkbox Filter
  const handleChange = (selectedValues: string[] | undefined) => {
    setValue(selectedValues);
  };

  return <CheckboxFilter {...args} onChange={handleChange} value={value} />;
};

export const Default = {
  args: {
    disabled: false,
    label: "Select options",
    limitTags: -1,
    name: "checkbox-filter",
    options: [
      "!",
      "2",
      "1",
      "10",
      "Gate 10",
      "Gate 4",
      "Gate 5",
      "@",
      "3",
      "b",
      "A",
      "C",
      "B",
      "Gate 1"
    ],
    value: ["A", "b"]
  },

  render: Template
};

export const Disabled = {
  args: {
    ...Default.args,
    disabled: true
  },

  render: Template
};
