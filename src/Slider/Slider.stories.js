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
  const onChange = (event, value, activeThumb) => {
    setValue(value);
    action("onChange")(event, value, activeThumb);
  };
  return (
    <div style={{ width: 500 }}>
      <Slider {...args} onChange={onChange} value={value} />;
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  defaultValue: 1,
  displayCurrentValue: "auto",
  maxValue: 10,
  minValue: 1,
  predefValues: [
    { label: "low", value: 1 },
    { label: "mid", value: 5 },
    { label: "high", value: 10 }
  ],
  stepSize: 1,
  title: "Sidebar example"
};
