import NumberField from "./NumberField";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: NumberField,
  title: "Text/NumberField"
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

export const CustomMinMaxAndStep = Template.bind({});
CustomMinMaxAndStep.args = {
  disabled: false,
  error: false,
  helperText: "Enter a Number Between 0 and 1",
  inputProps: { max: 1, min: 0, step: 0.1 },
  label: "Enter a Number",
  margin: "normal",
  required: false,
  size: "medium",
  variant: "outlined"
};
