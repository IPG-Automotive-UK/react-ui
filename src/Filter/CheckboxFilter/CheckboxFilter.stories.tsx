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
    options: Array.from(Array(10).keys()).map(i => `Option ${i}`),
    value: ["Option 1"],
    variant: "popper"
  },

  render: Template
};

export const AlwaysOpen = {
  args: {
    ...Default.args,
    variant: "always-open"
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
