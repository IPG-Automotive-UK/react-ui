import Autocomplete from "./Autocomplete";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  argTypes: {
    value: { type: "string" }
  },
  component: Autocomplete,
  title: "General/Autocomplete"
};

const Template = args => {
  const [value, setValue] = React.useState(args.value);
  React.useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  const onChange = (event, value, reason) => {
    setValue(value);
    action("onChange")(event, value, reason);
  };
  return <Autocomplete {...args} onChange={onChange} value={value} />;
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  error: false,
  helperText: "What is your selection going to be?",
  label: "Select an option",
  margin: "normal",
  options: ["Apple", "Apricot", "Pear"],
  required: true,
  size: "medium",
  value: "Apple",
  variant: "outlined"
};
