import React from "react";
import TextField from "./TextField";
import { action } from "@storybook/addon-actions";

export default {
  component: TextField,
  title: "Text/TextField"
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
  return <TextField {...args} onChange={onChange} value={value} />;
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  error: false,
  helperText: "What are you going to type?",
  label: "Enter some text here",
  margin: "normal",
  required: false,
  size: "medium",
  variant: "outlined"
};
