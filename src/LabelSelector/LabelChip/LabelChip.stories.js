import LabelChip from "./LabelChip";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  argTypes: {
    clickable: { type: "boolean" },
    color: { type: "string" },
    label: { type: "string" },
    onClick: { type: "function" },
    onDelete: { type: "function" },
    size: { type: "string" },
    variant: { type: "string" }
  },
  component: LabelChip,
  title: "General/LabelChip"
};

const Template = args => {
  return <LabelChip {...args} />;
};

// default
export const Default = Template.bind({});
Default.args = {
  clickable: false,
  color: "#005FA8",
  label: "Label",
  onClick: undefined,
  onDelete: undefined,
  size: "medium",
  variant: "filled"
};

// clickable chip
export const Clickable = Template.bind({});
Clickable.args = {
  ...Default.args,
  clickable: true,
  onClick: action("onClick")
};

// deletable chip
export const Deletable = Template.bind({});
Deletable.args = {
  ...Default.args,
  onDelete: action("onDelete")
};

// clickable and deletable chip
export const ClickableAndDeletable = Template.bind({});
ClickableAndDeletable.args = {
  ...Default.args,
  clickable: true,
  onClick: action("onClick"),
  onDelete: action("onDelete")
};

// chip with custom color
export const CustomColor = Template.bind({});
CustomColor.args = {
  ...Default.args,
  color: "#FF0000"
};

// chip with small size
export const Small = Template.bind({});
Small.args = {
  ...Default.args,
  size: "small"
};
