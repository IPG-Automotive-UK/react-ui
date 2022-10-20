import React from "react";
import StatusMessage from "./StatusMessage";
import { statusTypes } from "../statuses";

export default {
  component: StatusMessage,
  title: "Status/StatusMessage"
};

const Template = args => {
  return <StatusMessage {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  status: statusTypes[0]
};
