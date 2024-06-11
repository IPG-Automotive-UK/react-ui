import { Box, Link, Typography } from "@mui/material";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import React from "react";
import TruncatedTooltip from "./TruncatedTooltip";
import { TruncatedTooltipProps } from "./TruncatedTooltip.types";

export default {
  component: TruncatedTooltip,
  title: "General/TruncatedTooltip"
} satisfies Meta<typeof TruncatedTooltip>;

const Template: StoryFn<TruncatedTooltipProps> = args => {
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

const TypographyTemplate: StoryFn<TruncatedTooltipProps> = args => {
  return (
    <Box
      sx={{
        width: "220px"
      }}
    >
      <TruncatedTooltip component={Typography} {...args} />
    </Box>
  );
};

// const LinkTemplate: StoryFn<TruncatedTooltipProps> = args => {};

export const Default: StoryObj<typeof TruncatedTooltip> = {
  args: {
    children: "This is a long text that will be truncated",
    href: "This/can/take/an/href/prop"
  },

  render: TypographyTemplate
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
    component: Typography,
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

export const WrappedSection = args => {
  return (
    <TruncatedTooltip
      {...args}
      component="section"
      sx={{ width: "300px" }}
      multiline={5}
    >
      <Typography variant={"body1"}>
        Maybe there's a happy little Evergreen that lives here. Automatically,
        all of these beautiful, beautiful things will happen. We need dark in
        order to show light. But they're very easily killed. Clouds are
        delicate. I really believe that if you practice enough you could paint
        the 'Mona Lisa' with a two-inch brush. Look around, look at what we
        have. Beauty is everywhere, you only have to look to see it.
      </Typography>
    </TruncatedTooltip>
  );
};
