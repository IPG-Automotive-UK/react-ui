import FontPicker from "./FontPicker";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  argTypes: {
    value: { type: "string" }
  },
  component: FontPicker,
  title: "General/FontPicker"
};

const Template = args => {
  const [value, setValue] = React.useState(args.value);
  React.useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  const onChange = (event, value, reason) => {
    setValue(value);
    action("onChange")(event, value, reason);
  };
  return <FontPicker {...args} onChange={onChange} value={value} />;
};

export const Default = {
  render: Template,

  args: {
    disabled: false,
    error: false,
    label: "Font",
    margin: "normal",
    required: false,
    size: "medium",
    value: "Arial",
    variant: "outlined"
  }
};

export const CustomOptions = {
  render: Template,

  args: {
    disabled: false,
    error: false,
    label: "Font",
    margin: "normal",
    options: ["Arial", "Helvetica", "Times New Roman"],
    required: false,
    size: "medium",
    value: "Arial",
    variant: "outlined"
  }
};
