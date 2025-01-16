import { Meta, StoryFn } from "@storybook/react";

import LabelChip from "./LabelChip";
import { LabelChipProps } from "./LabelChip.types";
import React from "react";
import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/preview-api";

/**
 * Story metadata
 */
const meta: Meta<typeof LabelChip> = {
  component: LabelChip,
  title: "General/LabelChip"
};
export default meta;

// Define the template
const Template: StoryFn<LabelChipProps> = args => {
  return <LabelChip {...args} />;
};

// Define the chip selected with icon template
const SelectedWithIcon: StoryFn<LabelChipProps> = args => {
  //  useArgs is a hook that returns the current state of the args object
  const [{ selected, clickable }, updateArgs] = useArgs();

  // handle the click event on the chip
  const handleChipClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // update the selected value in the args object
    updateArgs({ selected: !selected });

    // call the onClick action with the event object
    action("onClick")(event);
  };

  return (
    <LabelChip
      {...args}
      selected={selected}
      onClick={clickable ? handleChipClick : undefined}
    />
  );
};

/**
 * Default story
 */
export const Default = {
  args: {
    clickable: false,
    color: "#003063",
    label: "Label",
    onClick: undefined,
    onDelete: undefined,
    size: "medium",
    variant: "filled"
  },

  render: Template
};

/**
 * This story shows a chip that is clickable
 */
export const Clickable = {
  args: {
    ...Default.args,
    clickable: true,
    onClick: action("onClick")
  },

  render: Template
};

/**
 * This story shows a chip that is deletable
 */
export const Deletable = {
  args: {
    ...Default.args,
    onDelete: action("onDelete")
  },

  render: Template
};

/**
 * This story shows a chip that is clickable and deletable
 */
export const ClickableAndDeletable = {
  args: {
    ...Default.args,
    clickable: true,
    onClick: action("onClick"),
    onDelete: action("onDelete")
  },

  render: Template
};

/**
 * This story shows a chip with a custom color
 */
export const CustomColor = {
  args: {
    ...Default.args,
    color: "#FF0000"
  },

  render: Template
};

/**
 * This story shows a chip with a small size
 */
export const Small = {
  args: {
    ...Default.args,
    size: "small"
  },

  render: Template
};

/**
 * This story shows selected state of chip with a icon
 */
export const WithSelectedIcon = {
  args: {
    ...Default.args,
    clickable: true,
    selected: true
  },

  render: SelectedWithIcon
};

/**
 * This story shows the tooltip when the chip is hovered and description is provided
 */
export const WithTooltip = {
  args: {
    ...Default.args,
    description: "This is a description"
  },

  render: Template
};
