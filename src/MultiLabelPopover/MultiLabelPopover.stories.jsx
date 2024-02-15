import MultiLabelPopover from "./MultiLabelPopover";
import React from "react";

export default {
  component: MultiLabelPopover,
  title: "General/MultiLabelPopover"
};

const labels = [
  { _id: 1, color: "#005FA8", description: "first label", name: "label 1" },
  { _id: 2, color: "#f542e0", description: "second label", name: "label 2" },
  { _id: 3, color: "#0000FF", description: "third label", name: "label 3" },
  { _id: 4, color: "#FFFF00", description: "fourth label", name: "label 4" },
  { _id: 5, color: "#FF00FF", description: "fifth label", name: "label 5" }
];

const Template = args => {
  return <MultiLabelPopover {...args} />;
};

export const Default = {
  args: {},
  render: Template
};

export const Single = {
  args: {
    labels: [labels[0]]
  },

  render: Template
};

export const Multi = {
  args: {
    labels
  },

  render: Template
};
