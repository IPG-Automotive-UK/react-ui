import React from "react";

import Copyright from "./Copyright";

export default {
  title: "General/Copyright",
  component: Copyright
};

const Template = args => <Copyright {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
