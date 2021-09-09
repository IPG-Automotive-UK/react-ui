import NoLicense from "./NoLicense";
import React from "react";

export default {
  component: NoLicense,
  title: "General/NoLicense"
};

const Template = args => {
  return <NoLicense {...args} />;
};

export const Default = Template.bind({});
Default.args = { label: "No license found. Please retry." };
