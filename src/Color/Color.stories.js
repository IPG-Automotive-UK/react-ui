import Color from "./Color";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  argTypes: {
    value: {
      control: {
        type: "color"
      }
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

export const Default = {
  args: {
    showControls: true,
    showPicker: true,
    value: "rgba(255,0,0,1)"
  },

  render: Template
};

export const NoColor = {
  args: {
    showControls: true,
    showPicker: true,
    value: ""
  },

  render: Template
};

export const NoControls = {
  args: {
    showControls: false,
    showPicker: true,
    value: "rgba(255,0,0,1)"
  },

  render: Template
};

export const NoNoColor = {
  args: {
    showControls: true,
    showNoColor: false,
    value: "rgba(255,0,0,1)"
  },

  render: Template
};

export const NoPicker = {
  args: {
    showControls: true,
    showPicker: false,
    value: "rgba(255,0,0,1)"
  },

  render: Template
};
