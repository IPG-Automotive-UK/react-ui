import LabelSetter from "./LabelSetter";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: LabelSetter,
  title: "General/LabelSetter"
};

const Template = args => {
  return <LabelSetter {...args} onClick={action("onClick")} />;
};

// default story
export const Default = Template.bind({});
Default.args = {
  headerNames: ["Value", "Label"],
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
    },
    {
      label: "",
      value: null
    }
  ]
};
