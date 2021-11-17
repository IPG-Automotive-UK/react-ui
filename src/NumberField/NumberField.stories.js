import NumberField from "./NumberField";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: NumberField,
  title: "General/NumberField"
};

const Template = args => {
  const [value, setValue] = React.useState(args.value);
  React.useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  const onChange = event => {
    setValue(value);
    action("onChange")(event, event.target.value);
  };
  return <NumberField {...args} onChange={onChange} value={value} />;
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  error: false,
  helperText: "What Number are you going to type?",
  label: "Enter a Number",
  margin: "normal",
  required: false,
  size: "medium",
  stepper: true,
  variant: "outlined"
};

export const NoStepper = Template.bind({});
NoStepper.args = {
  disabled: false,
  error: false,
  helperText: "What Number are you going to type?",
  label: "Enter a Number",
  margin: "normal",
  required: false,
  size: "medium",
  stepper: false,
  variant: "outlined"
};
