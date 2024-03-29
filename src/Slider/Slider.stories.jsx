import React from "react";
import Slider from "./Slider";
import { action } from "@storybook/addon-actions";

export default {
  component: Slider,
  title: "General/Slider"
};

const Template = args => {
  const [value, setValue] = React.useState(args.value);
  React.useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  const onChange = (event, value) => {
    setValue(value);
    action("onChange")(event, value);
  };
  return (
    <div
      style={{
        height: args.orientation === "vertical" ? 400 : 100,
        paddingLeft: "10px",
        width: args.orientation === "vertical" ? 120 : 400
      }}
    >
      <Slider {...args} onChange={onChange} value={value} />
    </div>
  );
};

export const Default = {
  args: {
    color: "primary",
    disabled: false,
    labelPosition: "bottom",
    labelStyle: {},
    labels: [],
    max: 10,
    min: 1,
    orientation: "horizontal",
    showLabels: true,
    step: 1,
    title: "Slider example",
    value: 1,
    valueLabelDisplay: "auto"
  },

  render: Template
};

export const CustomLabels = {
  args: {
    color: "primary",
    disabled: false,
    labelPosition: "bottom",
    labelStyle: {},
    labels: [
      { label: "low", value: 1 },
      { label: "mid", value: 5 },
      { label: "high", value: 10 }
    ],
    max: 10,
    min: 1,
    orientation: "horizontal",
    showLabels: true,
    step: 1,
    title: "Slider example",
    value: 1,
    valueLabelDisplay: "auto"
  },

  render: Template
};

export const StyledLabels = {
  args: {
    color: "primary",
    disabled: false,
    labelPosition: "top",
    labelStyle: {
      color: "blue",
      fontFamily: "Montserrat",
      fontStyle: "italic"
    },
    labels: [
      { label: "low", value: 1 },
      { label: "mid", value: 5 },
      { label: "high", value: 10 }
    ],
    max: 10,
    min: 1,
    orientation: "horizontal",
    showLabels: true,
    step: 1,
    title: "Slider example",
    value: 1,
    valueLabelDisplay: "auto"
  },

  render: Template
};

export const StyledSlider = {
  args: {
    color: "green",
    disabled: false,
    labelPosition: "bottom",
    labelStyle: {},
    labels: [
      { label: "low", value: 1 },
      { label: "mid", value: 5 },
      { label: "high", value: 10 }
    ],
    max: 10,
    min: 1,
    orientation: "horizontal",
    showLabels: true,
    step: 1,
    title: "Slider example",
    value: 1,
    valueLabelDisplay: "auto"
  },

  render: Template
};

export const Disabled = {
  args: {
    color: "primary",
    disabled: true,
    labelPosition: "bottom",
    labelStyle: {},
    labels: [],
    max: 10,
    min: 1,
    orientation: "horizontal",
    showLabels: true,
    step: 1,
    title: "Slider example",
    value: 1,
    valueLabelDisplay: "auto"
  },

  render: Template
};

export const VerticalSlider = {
  args: {
    color: "primary",
    disabled: false,
    labelPosition: "right",
    labelStyle: {},
    labels: [],
    max: 10,
    min: 1,
    orientation: "vertical",
    showLabels: true,
    step: 1,
    title: "Vertical slider",
    value: 1,
    valueLabelDisplay: "auto"
  },

  render: Template
};
