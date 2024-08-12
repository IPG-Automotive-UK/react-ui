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
  args: {
    clickable: false,
    color: "#005FA8",
    label: "Label",
    onClick: undefined,
    onDelete: undefined,
    size: "medium",
    variant: "filled"
  },

  render: Template
};

export const Clickable = {
  args: {
    ...Default.args,
    clickable: true,
    onClick: action("onClick")
  },

  render: Template
};

export const Deletable = {
  args: {
    ...Default.args,
    onDelete: action("onDelete")
  },

  render: Template
};

export const ClickableAndDeletable = {
  args: {
    ...Default.args,
    clickable: true,
    onClick: action("onClick"),
    onDelete: action("onDelete")
  },

  render: Template
};

export const CustomColor = {
  args: {
    ...Default.args,
    color: "#FF0000"
  },

  render: Template
};

export const Small = {
  args: {
    ...Default.args,
    size: "small"
  },

  render: Template
};

export const Selected = {
  args: {
    ...Default.args,
    selected: true
  },

  render: Template
};

export const Tooltip = {
  args: {
    ...Default.args,
    description: "This is a description"
  },

  render: Template
};
