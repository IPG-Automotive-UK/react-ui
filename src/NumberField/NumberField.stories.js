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

export const Default = {
  render: Template,

  args: {
    disabled: false,
    error: false,
    helperText: "What Number are you going to type?",
    label: "Enter a Number",
    margin: "normal",
    required: false,
    showMinMaxErrorMessage: true,
    size: "medium",
    stepper: true,
    variant: "outlined"
  }
};

export const StartAdornment = {
  render: Template,

  args: {
    disabled: false,
    error: false,
    helperText: "What Number are you going to type?",
    label: "Enter a Number",
    margin: "normal",
    required: false,
    showMinMaxErrorMessage: true,
    size: "medium",
    startAdornment: "$",
    stepper: true,
    variant: "outlined"
  }
};

export const EndAdornment = {
  render: Template,

  args: {
    disabled: false,
    endAdornment: "px",
    error: false,
    helperText: "What Number are you going to type?",
    label: "Enter a Number",
    margin: "normal",
    required: false,
    showMinMaxErrorMessage: true,
    size: "medium",
    stepper: true,
    variant: "outlined"
  }
};

export const SmallAndDense = {
  render: Template,

  args: {
    disabled: false,
    error: false,
    helperText: "What Number are you going to type?",
    label: "Enter a Number",
    margin: "dense",
    required: false,
    showMinMaxErrorMessage: true,
    size: "small",
    stepper: false,
    variant: "outlined"
  }
};

export const NoStepper = {
  render: Template,

  args: {
    disabled: false,
    error: false,
    helperText: "What Number are you going to type?",
    label: "Enter a Number",
    margin: "normal",
    required: false,
    showMinMaxErrorMessage: true,
    size: "medium",
    stepper: false,
    variant: "outlined"
  }
};

export const CustomMinMaxAndStep = {
  render: Template,

  args: {
    disabled: false,
    error: false,
    label: "Enter a Number",
    margin: "normal",
    max: 1,
    min: 0,
    required: false,
    showMinMaxErrorMessage: true,
    size: "medium",
    step: 0.1,
    variant: "outlined"
  }
};

export const InitialError = {
  render: Template,

  args: {
    disabled: false,
    error: false,
    label: "Enter a Number",
    margin: "normal",
    max: 1,
    min: 0,
    required: false,
    showMinMaxErrorMessage: true,
    size: "medium",
    step: 0.1,
    value: 2,
    variant: "outlined"
  }
};

export const NoMinMaxErrorMessage = {
  render: Template,

  args: {
    disabled: false,
    error: false,
    label: "Enter a Number",
    margin: "normal",
    max: 1,
    min: 0,
    required: false,
    showMinMaxErrorMessage: false,
    size: "medium",
    step: 0.1,
    value: 2,
    variant: "outlined"
  }
};
