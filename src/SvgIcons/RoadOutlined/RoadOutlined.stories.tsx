import React from "react";
import RoadOutlined from "./RoadOutlined";

export default {
  component: RoadOutlined,
  title: "General/SvgIcons/RoadOutlined"
};

const Template = args => {
  return <RoadOutlined {...args} />;
};

export const Default = {
  args: {
    sx: { height: 60, width: 60 }
  },

  render: Template
};
