import { Box, Link, Typography } from "@mui/material";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import React from "react";
import TruncatedTooltip from "./TruncatedTooltip";

export default {
  component: TruncatedTooltip,
  title: "General/TruncatedTooltip"
} satisfies Meta<typeof TruncatedTooltip>;

const Template: StoryFn<typeof TruncatedTooltip> = args => {
  return (
    <Box
      sx={{
        width: "220px"
      }}
    >
      <TruncatedTooltip {...args} />
    </Box>
  );
};

export const Default: StoryObj<typeof TruncatedTooltip> = {
  args: {
    children: "This is a long text that will be truncated",
    component: Typography,
    href: "This/can/take/an/href/prop"
  },

  render: Template
};

export const LinkUsingChildren = {
  args: {
    children: (
      <Link href="" variant={"body1"}>
        This is a long text that will be truncated
      </Link>
    )
  },

  render: Template
};

export const LinkUsingComponent: StoryObj<typeof TruncatedTooltip> = {
  args: {
    children: "This is a long text that will be truncated",
    component: Link,
    href: "This/can/take/an/href/prop"
  },

  render: Template
};

export const Multiline = {
  args: {
    children: `Maybe there's a happy little Evergreen that lives here. 
      Automatically, all of these beautiful, beautiful things will happen. 
      We need dark in order to show light. But they're very easily killed. 
      Clouds are delicate. I really believe that if you practice enough you could paint the 'Mona Lisa' 
      with a two-inch brush. Look around, look at what we have. 
      Beauty is everywhere, you only have to look to see it.`,
    component: Typography,
    multiline: 3
  },

  render: Template
};

export const LinkUsingComponentWithoutTruncation: StoryObj<
  typeof TruncatedTooltip
> = {
  args: {
    alwaysShowTooltip: true,
    children: "No truncation",
    component: Link,
    href: "This/can/take/an/href/prop"
  },

  render: Template
};

export const LinkUsingComponentAlwaysShowingTooltipTextTruncated: StoryObj<
  typeof TruncatedTooltip
> = {
  args: {
    alwaysShowTooltip: true,
    children: "This is a long text that will be truncated",
    component: Link,
    href: "This/can/take/an/href/prop"
  },

  render: Template
};

export const ComponentUsesTooltipProps: StoryObj<typeof TruncatedTooltip> = {
  args: {
    TooltipProps: { placement: "bottom-start" },
    alwaysShowTooltip: true,
    children: "No truncation",
    component: Link,
    href: "This/can/take/an/href/prop"
  },

  render: Template
};
