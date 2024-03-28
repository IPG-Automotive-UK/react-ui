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
  const onBlur = event => {
    action("onBlur");
  };
  return (
    <NumberField {...args} onBlur={onBlur} onChange={onChange} value={value} />
  );
};

export const Default = {
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
  },

  render: Template
};

export const Uncontrolled = {
  args: {
    disabled: false,
    error: false,
    helperText: "What Number are you going to type?",
    label: "Enter a Number",
    margin: "normal",
    onBlur: action("onBlur"),
    required: false,
    showMinMaxErrorMessage: true,
    size: "medium",
    stepper: true,
    variant: "outlined"
  },
  render: NumberField
};

export const StartAdornment = {
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
  },

  render: Template
};

export const EndAdornment = {
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
  },

  render: Template
};

export const SmallAndDense = {
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
  },

  render: Template
};

export const NoStepper = {
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
  },

  render: Template
};

export const CustomMinMaxAndStep = {
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
  },

  render: Template
};

export const InitialError = {
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
  },

  render: Template
};

export const NoMinMaxErrorMessage = {
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
  },

  render: Template
};
