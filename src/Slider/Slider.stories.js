import React from "react";
import Slider from "./Slider";
import { action } from "@storybook/addon-actions";

export default {
  argTypes: {
    value: { type: "number" }
  },
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
    <div style={{ width: 500 }}>
      <Slider {...args} onChange={onChange} value={value} />
    </div>
  );
};

// default story
export const Default = Template.bind({});
Default.args = {
  color: "primary",
  labelColor: "primary",
  labelFont: "Sans-Serif, Helvetica",
  labelPosition: "bottom",
  labels: [],
  max: 10,
  min: 1,
  orientation: "horizontal",
  showLabels: true,
  step: 1,
  title: "Slider example",
  value: 1,
  valueLabelDisplay: "auto"
};

// custom labels story
export const CustomLabels = Template.bind({});
CustomLabels.args = {
  color: "primary",
  labelColor: "primary",
  labelFont: "Sans-Serif, Arial",
  labelPosition: "bottom",
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
};

// styled labels
export const StyledLabels = Template.bind({});
StyledLabels.args = {
  color: "primary",
  labelPosition: "top",
  labelStyle: {
    color: "blue",
    fontFamily: "Sans-Serif, Helvetica",
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
};

// styled labels
export const StyledSlider = Template.bind({});
StyledSlider.args = {
  color: "green",
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
};
