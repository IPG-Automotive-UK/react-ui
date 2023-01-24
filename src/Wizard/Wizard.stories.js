import React from "react";
import Wizard from "./Wizard";

export default {
  component: Wizard,
  title: "Wizard/Wizard"
};

const Template = args => {
  return <Wizard {...args} />;
};

// default story
export const Default = Template.bind({});
Default.args = {
  title: "Wizard Title"
};

// no title story
export const NoTitle = Template.bind({});
NoTitle.args = {
  title: ""
};
