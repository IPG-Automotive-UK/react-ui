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
  labelPosition: "bottom",
  labels: true,
  max: 10,
  min: 1,
  orientation: "horizontal",
  predefValues: [],
  step: 1,
  title: "Slider example",
  value: 1,
  valueLabelDisplay: "auto"
};

// custom labels story
export const CustomLabels = Template.bind({});
CustomLabels.args = {
  labelPosition: "bottom",
  labels: true,
  max: 10,
  min: 1,
  orientation: "horizontal",
  predefValues: [
    { label: "low", value: 1 },
    { label: "mid", value: 5 },
    { label: "high", value: 10 }
  ],
  step: 1,
  title: "Slider example",
  value: 1,
  valueLabelDisplay: "auto"
};
