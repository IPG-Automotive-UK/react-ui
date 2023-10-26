import React from "react";
import Select from "./Select";

export default {
  argTypes: {
    value: { type: "string" }
  },
  component: Select,
  title: "Selectors/Select"
};

const Template = args => {
  const [value, setValue] = React.useState(args.value);
  React.useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  const onChange = event => setValue(event.target.value);
  return <Select {...args} onChange={onChange} value={value} />;
};

export const Default = {
  args: {
    disabled: false,
    error: false,
    helperText: "What is your selection going to be?",
    label: "Select an option",
    margin: "normal",
    options: ["Option A", "Option B", "Option C"],
    required: true,
    size: "medium",
    variant: "outlined"
  },

  render: Template
};

export const KeyValueOptions = {
  args: {
    disabled: false,
    error: false,
    helperText: "",
    label: "Select an option",
    margin: "normal",
    options: [
      { key: "option-a", value: "Option A" },
      { key: "option-b", value: "Option B" }
    ],
    required: true,
    size: "medium",
    variant: "outlined"
  },

  render: Template
};
