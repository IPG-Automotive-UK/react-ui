import React from "react";
import StatusTypography from "./StatusTypography";
import { statusTypes } from "../statuses";

export default {
  component: StatusTypography,
  title: "Status/StatusTypography"
};

const Template = args => {
  return <StatusTypography {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  status: statusTypes[0]
};
