import CheckboxFilter from "./CheckboxFilter";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: CheckboxFilter,
  title: "Filters/CheckboxFilter"
};

// story template with state for selection
const Template = args => {
  const [value, setValue] = React.useState(args.value);
  React.useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  const onChange = newValue => {
    setValue(newValue);
    action("onChange")(newValue);
  };
  return <CheckboxFilter {...args} onChange={onChange} value={value} />;
};

export const Default = {
  render: Template,

  args: {
    label: "Select options",
    limitTags: -1,
    name: "checkbox-filter",
    options: Array.from(Array(20).keys()).map(i => `Option ${i}`),
    value: ["Option 1"],
    variant: "popper"
  }
};

export const AlwaysOpen = {
  render: Template,

  args: {
    ...Default.args,
    variant: "always-open"
  }
};
