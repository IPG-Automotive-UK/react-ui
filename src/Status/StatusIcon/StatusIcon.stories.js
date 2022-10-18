import React from "react";
import StatusIcon from "./StatusIcon";
import { statusTypes } from "../statuses";

export default {
  component: StatusIcon,
  title: "Status/StatusIcon"
};

const Template = args => {
  return <StatusIcon {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  height: 40,
  status: statusTypes[0],
  width: 40
};
