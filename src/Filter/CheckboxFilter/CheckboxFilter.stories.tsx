import { Meta, Story } from "@storybook/react";

import CheckboxFilter from "./CheckboxFilter";
import { CheckboxFilterProps } from "./CheckboxFilter.types";
import React from "react";
import { action } from "@storybook/addon-actions";

/**
 * Story metadata
 */
const meta: Meta<typeof CheckboxFilter> = {
  component: CheckboxFilter,
  title: "Filters/CheckboxFilter"
};
export default meta;

// story template with state for selection
const Template: Story<CheckboxFilterProps> = args => {
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
  options: Array.from(Array(20).keys()).map(i => `Option ${i}`),
  size: "small",
  value: ["Option 1"],
  variant: "popper"
};

// AlwaysOpen story
export const AlwaysOpen = Template.bind({});
AlwaysOpen.args = {
  ...Default.args,
  variant: "always-open"
};
