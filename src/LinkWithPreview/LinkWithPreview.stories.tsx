import { Meta, StoryFn } from "@storybook/react";

import { Box } from "@mui/material";
import LinkWithPreview from "./LinkWithPreview";
import { LinkWithPreviewProps } from "./LinkWithPreview.types";
import React from "react";

/**
 * Story metadata
 */
const meta: Meta<typeof LinkWithPreview> = {
  component: LinkWithPreview,
  title: "Preview/LinkWithPreview"
};
export default meta;

// Story Template
const Template: StoryFn<LinkWithPreviewProps> = args => {
  return <LinkWithPreview {...args}> "something"</LinkWithPreview>;
};

const content = (
  <Box>
    <h1>Hello World</h1>
  </Box>
);

/**
 * Default story
 */
export const Default = {
  args: {
    content,
    href: "https://example.com"
  },
  render: Template
};
