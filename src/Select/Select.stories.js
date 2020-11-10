import React from "react";

import Select from "./Select";

export default {
  title: "General/Select",
  component: Select
};

const Template = args => {
  const [value, setValue] = React.useState(args.value);
  const onChange = event => setValue(event.target.value);
  return <Select {...args} onChange={onChange} value={value} />;
};

export const Default = Template.bind({});
Default.args = {
  helperText: "What is your selection going to be?",
  label: "Select an option",
  options: ["Option A", "Option B", "Option C"],
  required: true
};

const TeamSelector = args => {
  const [value, setValue] = React.useState(args.value);
  const onChange = event => setValue(event.target.value);
  return <Select {...args} onChange={onChange} value={value} />;
};

export const Teams = TeamSelector.bind({});
Teams.args = {
  label: "Select team",
  labelWidth: 100,
  options: ["Team A", "Team B", "Team C"],
  required: true,
  value: "Team B",
  variant: "outlined"
};
