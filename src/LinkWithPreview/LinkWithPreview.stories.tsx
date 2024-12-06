import { Box, Typography } from "@mui/material";
import { Meta, StoryFn } from "@storybook/react";

import LinkWithPreview from "./LinkWithPreview";
import { LinkWithPreviewProps } from "./LinkWithPreview.types";
import React from "react";
import { RoadPreview } from "../RoadPreview";

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
    <Box maxWidth="100px">
      <LinkWithPreview {...args} />
    </Box>
  );
};

// filled RoadPreview component
const content = (
  <RoadPreview
    name="MyRoad"
    href="https://example.com"
    version="1.0"
    image="https://picsum.photos/id/191/400/200"
    description="My description of some road"
    format="CarMaker"
    formatVersion="12.0.0"
    file="MyRoad.rd5"
    createdAt="10-09-24 10:24:08"
    user={{ color: "#8FBC8F", name: "John Wick" }}
    sx={{
      borderRadius: "8px",
      boxShadow: 3,
      maxWidth: "480px",
      padding: "16px"
    }}
  />
);

/**
 * Default story
 */
export const Default = {
  args: {
    children: "MyLink",
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
 * RoadPreview
 */
export const RoadPreviewOnHover = {
  args: {
    children: "MyLink",
    content,
    href: "https://example.com"
  },
  render: Template
};

/**
 * Long link text to show truncation
 */
export const LongLinkText = {
  args: {
    children: "MyVeryLooooooooongLink",
    content,
    href: "https://example.com"
  },
  render: Template
};
