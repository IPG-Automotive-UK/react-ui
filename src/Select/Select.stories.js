import React from "react";

import Select from "./Select";

export default {
  argTypes: {
    value: { type: "string" }
  },
  component: Select,
  title: "General/Select"
};

const Template = args => {
  const [value, setValue] = React.useState(args.value);
  React.useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  const onChange = event => setValue(event.target.value);
  return <Select {...args} onChange={onChange} value={value} />;
};

export const Default = Template.bind({});
Default.args = {
  error: false,
  helperText: "What is your selection going to be?",
  label: "Select an option",
  options: ["Option A", "Option B", "Option C"],
  required: true
};
