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

// default story
export const Default = Template.bind({});
Default.args = {
  label: "Select options",
  limitTags: -1,
  name: "checkbox-filter",
  options: ["Option 1", "Option 2", "Option 3"],
  value: ["Option 1"],
  variant: "popper"
};

// AlwaysOpen story
export const AlwaysOpen = Template.bind({});
AlwaysOpen.args = {
  ...Default.args,
  variant: "always-open"
};
