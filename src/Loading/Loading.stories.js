import Loading from "./Loading";
import React from "react";

export default {
  component: Loading,
  title: "General/Loading"
};

const Template = args => {
  return <Loading {...args} />;
};

export const Default = Template.bind({});
Default.args = { label: "Loading..." };
