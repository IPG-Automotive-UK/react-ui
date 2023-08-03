import { Meta, StoryFn } from "@storybook/react";

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

const Template: StoryFn<LabelChipProps> = args => {
  return <LabelChip {...args} />;
};

export const Default = {
  render: Template,

  args: {
    clickable: false,
    color: "#005FA8",
    label: "Label",
    onClick: undefined,
    onDelete: undefined,
    size: "medium",
    variant: "filled"
  }
};

export const Clickable = {
  render: Template,

  args: {
    ...Default.args,
    clickable: true,
    onClick: action("onClick")
  }
};

export const Deletable = {
  render: Template,

  args: {
    ...Default.args,
    onDelete: action("onDelete")
  }
};

export const ClickableAndDeletable = {
  render: Template,

  args: {
    ...Default.args,
    clickable: true,
    onClick: action("onClick"),
    onDelete: action("onDelete")
  }
};

export const CustomColor = {
  render: Template,

  args: {
    ...Default.args,
    color: "#FF0000"
  }
};

export const Small = {
  render: Template,

  args: {
    ...Default.args,
    size: "small"
  }
};
