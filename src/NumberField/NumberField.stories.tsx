import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { NumberFieldChangeEvent, NumberFieldProps } from "./NumberField.types";
import NumberField from "./NumberField";
import React from "react";
import { action } from "@storybook/addon-actions";

type Story = StoryObj<typeof NumberField>;

export default {
  component: NumberField,
  title: "Text/NumberField"
} satisfies Meta<typeof NumberField>;

const Template: StoryFn<NumberFieldProps> = args => {
  const [value, setValue] = React.useState(args.value);

  React.useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  const onChange = (event: NumberFieldChangeEvent) => {
    setValue(value);
    action("onChange")(event, event.target.value);
  };

  const onBlur = () => {
    action("onBlur");
  };

  return (
    <NumberField {...args} onBlur={onBlur} onChange={onChange} value={value} />
  );
};

export const Default: Story = {
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

export const Uncontrolled: Story = {
  args: {
    defaultValue: 12,
    disabled: false,
    error: false,
    helperText: "What Number are you going to type?",
    label: "Enter a Number",
    margin: "normal",
    onBlur: action("onBlur"),
    required: false,
    size: "medium",
    stepper: true,
    variant: "outlined"
  },
  render: NumberField
};

export const StartAdornment: Story = {
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

export const EndAdornment: Story = {
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

export const SmallAndDense: Story = {
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

export const NoStepper: Story = {
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

export const CustomMinMaxAndStep: Story = {
  args: {
    disabled: false,
    error: false,
    inputProps: {
      step: 0.1
    },
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

export const InitialError: Story = {
  args: {
    disabled: false,
    error: true,
    helperText: "Oh no you've made a mistake!",
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
