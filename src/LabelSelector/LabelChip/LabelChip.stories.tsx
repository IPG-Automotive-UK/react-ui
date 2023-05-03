import { Meta, Story } from "@storybook/react";

import LabelChip from "./LabelChip";
import { LabelChipProps } from "./LabelChip.types";
import React from "react";
import { action } from "@storybook/addon-actions";

/**
 * Story metadata
 */
const meta: Meta<typeof LabelChip> = {
  component: LabelChip,
  title: "General/LabelChip"
};
export default meta;

const Template: Story<LabelChipProps> = args => {
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
