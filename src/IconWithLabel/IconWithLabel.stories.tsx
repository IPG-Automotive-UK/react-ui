import { Meta, StoryFn } from "@storybook/react";

import { Box } from "@mui/material";
import { CarMakerLogo } from "../SvgIcons";
import IconWithLabel from "./IconWithLabel";
import { IconWithLabelProps } from "./IconWithLabel.types";
import React from "react";

/**
 * Story metadata
 */
const meta: Meta<typeof IconWithLabel> = {
  argTypes: {
    icon: {
      control: false
    }
  },
  component: IconWithLabel,
  title: "Label/IconWithLabel"
};
export default meta;

// Story Template
const Template: StoryFn<IconWithLabelProps> = args => {
  return (
    <Box
      sx={{
        maxWidth: 100
      }}
    >
      <IconWithLabel {...args} />
    </Box>
  );
};

// Default
export const Default = {
  args: {
    href: "https://example.com",
    icon: <CarMakerLogo />,
    label: "Example",
    tooltip: "Random text"
  },
  render: Template
};

// Without href
export const WithoutHref = {
  args: {
    icon: <CarMakerLogo />,
    label: "Example"
  },
  render: Template
};

// Truncation example
export const TruncatesLabel = {
  args: {
    icon: <CarMakerLogo />,
    label: "Very Long Label That Needs to be Truncated"
  },
  render: Template
};

// Without tooltip
export const WithoutTooltip = {
  args: {
    href: "https://example.com",
    icon: <CarMakerLogo />,
    label: "Example"
  },
  render: Template
};
