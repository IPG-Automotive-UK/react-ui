import RangeFilter from "./RangeFilter";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: RangeFilter,
  title: "Filters/RangeFilter"
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
  return <RangeFilter {...args} onChange={onChange} value={value} />;
};

// default story
export const Default = Template.bind({});
Default.args = {
  label: "Select range",
  max: 100,
  min: 0,
  name: "range-filter",
  value: [0, 100]
};
