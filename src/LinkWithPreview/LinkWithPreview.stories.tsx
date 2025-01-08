import { Box, Typography } from "@mui/material";
import { Meta, StoryFn } from "@storybook/react";

import LinkWithPreview from "./LinkWithPreview";
import { LinkWithPreviewProps } from "./LinkWithPreview.types";
import React from "react";

/**
 * Story metadata
 */
const meta: Meta<typeof LinkWithPreview> = {
  argTypes: {
    children: { control: "text" },
    content: { control: false }
  },
  component: LinkWithPreview,
  title: "Preview/LinkWithPreview"
};
export default meta;

// Story Template
const Template: StoryFn<LinkWithPreviewProps> = args => {
  return (
    <Box maxWidth={100} sx={{ overflowWrap: "anywhere" }}>
      <LinkWithPreview {...args} />
    </Box>
  );
};

/**
 * Default story
 */
export const Default = {
  args: {
    children: "MyLink",
    color: "primary",
    content: (
      <Box boxShadow={2}>
        <Typography>Hello World!</Typography>
      </Box>
    ),
    href: "https://example.com",
    variant: "body2"
  },
  render: Template
};

/**
 * Long link text to show truncation
 */
export const LongLinkText = {
  args: {
    children: "MyVeryLooooooooongLink",
    content: (
      <Box boxShadow={2}>
        <Typography>Hello World!</Typography>
      </Box>
    ),
    href: "https://example.com"
  },
  render: Template
};

/**
 * Long link text to show wrapping
 */
export const LongLinkTextWrap = {
  args: {
    children: "MyVeryLooooooooongLink",
    content: (
      <Box boxShadow={2}>
        <Typography>Hello World!</Typography>
      </Box>
    ),
    href: "https://example.com",
    sx: { whiteSpace: "wrap" }
  },
  render: Template
};
