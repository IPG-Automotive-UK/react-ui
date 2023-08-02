import React from "react";
import StatusLabel from "./StatusLabel";
import { statusTypes } from "../statuses";

export default {
  component: StatusLabel,
  title: "Status/StatusLabel"
};

const Template = args => {
  return <StatusLabel {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  height: 24,
  status: statusTypes[0],
  variant: "body2",
  width: 24
};
