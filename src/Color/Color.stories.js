import Color from "./Color";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  argTypes: {
    showControls: {
      control: {
        type: "boolean"
      }
    },
    showPicker: {
      control: {
        type: "boolean"
      }
    },
    value: {
      control: { type: "color" }
    }
  },
  component: Color,
  title: "General/Color"
};

const Template = args => {
  const [value, setValue] = React.useState(args.value);
  React.useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  const onChange = color => {
    setValue(color);
    action("onChange")(color);
  };

  return (
    <Color
      {...args}
      onChange={onChange}
      showControls={args.showControls}
      showPicker={args.showPicker}
      value={value}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  showControls: true,
  showPicker: true,
  value: "rgba(255,0,0,1)"
};

export const NoColor = Template.bind({});
NoColor.args = {
  showControls: true,
  showPicker: true,
  value: ""
};

export const NoControls = Template.bind({});
NoControls.args = {
  showControls: false,
  showPicker: true,
  value: "rgba(255,0,0,1)"
};

export const NoPicker = Template.bind({});
NoPicker.args = {
  showControls: true,
  showPicker: false,
  value: "rgba(255,0,0,1)"
};
