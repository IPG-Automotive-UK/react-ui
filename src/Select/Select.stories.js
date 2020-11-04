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

export const Normal = Template.bind({});
Normal.args = {
  options: ["Option A", "Option B", "Option C"],
  label: "Select an option",
  helperText: "What is your selection going to be?",
  required: true
};

const TeamSelector = args => {
  const [value, setValue] = React.useState(args.value);
  const onChange = event => setValue(event.target.value);
  return <Select {...args} onChange={onChange} value={value} />;
};

export const Teams = TeamSelector.bind({});
Teams.args = {
  options: ["Team A", "Team B", "Team C"],
  value: "Team B",
  label: "Select team",
  required: true,
  variant: "outlined",
  labelWidth: 100
};
