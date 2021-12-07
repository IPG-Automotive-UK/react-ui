import LabelSetter from "./LabelSetter";
import React from "react";

export default {
  component: LabelSetter,
  title: "General/LabelSetter"
};

const Template = args => {
  return <LabelSetter {...args} />;
};

// default story
export const Default = Template.bind({});
Default.args = {
  headerNames: ["State value", "State label"],
  rows: [
    {
      label: "Label1",
      value: 0
    },
    {
      label: "Label2",
      value: 1
    },
    {
      label: "Label3",
      value: 2
    }
  ]
};
