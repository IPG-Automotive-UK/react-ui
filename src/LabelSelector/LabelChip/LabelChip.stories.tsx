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

const Template: StoryFn<LabelChipProps> = args => {
  //  useArgs is a hook that returns the current state of the args object
  const [{ selected, clickable, showIcon }, updateArgs] = useArgs();

  // update the args object with the new selected value
  React.useEffect(() => {
    updateArgs({ selected });
  }, [selected, updateArgs]);

  // update the selected value when the chip is clicked
  const handleChipclick = (event: React.MouseEvent<HTMLDivElement>) => {
    // update the selected value only if the chip has an icon
    if (showIcon) {
      updateArgs({ selected: !selected });
    }

    // call the onClick action with the event object
    action("onClick")(event);
  };

  return (
    <LabelChip
      {...args}
      selected={selected}
      onClick={clickable ? handleChipclick : undefined}
    />
  );
};

/**
 * Default story
 */
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

/**
 * This story shows a chip that is clickable
 */
export const Clickable = {
  args: {
    ...Default.args,
    clickable: true
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
    selected: true,
    showIcon: true
  },

  render: Template
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
