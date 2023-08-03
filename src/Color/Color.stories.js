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
  render: Template,

  args: {
    showControls: true,
    showPicker: true,
    value: "rgba(255,0,0,1)"
  }
};

export const NoColor = {
  render: Template,

  args: {
    showControls: true,
    showPicker: true,
    value: ""
  }
};

export const NoControls = {
  render: Template,

  args: {
    showControls: false,
    showPicker: true,
    value: "rgba(255,0,0,1)"
  }
};

export const NoNoColor = {
  render: Template,

  args: {
    showControls: true,
    showNoColor: false,
    value: "rgba(255,0,0,1)"
  }
};

export const NoPicker = {
  render: Template,

  args: {
    showControls: true,
    showPicker: false,
    value: "rgba(255,0,0,1)"
  }
};
