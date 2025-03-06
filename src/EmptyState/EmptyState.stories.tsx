import { AddOutlined, AddToQueue } from "@mui/icons-material";
import { Meta, StoryFn, StoryObj } from "@storybook/react";

import BuildImage from "../../static/BuildImage.svg";
import { Button } from "@mui/material";
import CarImage from "../../static/CarImage.svg";
import EmptyState from "./EmptyState";
import React from "react";
import ResultImage from "../../static/ResultImage.svg";

export default {
  component: EmptyState,
  title: "Layout/EmptyState"
} satisfies Meta<typeof EmptyState>;

const Template: StoryFn<typeof EmptyState> = args => {
  return <EmptyState {...args} />;
};

export const Default: StoryObj<typeof EmptyState> = {
  args: {
    actions: [
      <Button key="default-action" variant="contained" size="large">
        Action
      </Button>
    ],
    icon: <AddToQueue />,
    subtitle: "Subtitle",
    title: "Title"
  },
  render: Template
};

export const WithMultipleActions: StoryObj<typeof EmptyState> = {
  args: {
    actions: [
      <Button key="upload-prototype" variant="outlined" size="large">
        UPLOAD PROTOTYPE
      </Button>,
      <Button key="build-prototype" variant="contained" size="large">
        BUILD PROTOTYPE
      </Button>
    ],
    hideIconBackground: true,
    icon: <img src={CarImage} alt="Icon" />,
    subtitle:
      "Build your virtual vehicle or upload a design to view the prototypes.",
    title: "Let's Start Building"
  },
  render: Template
};

export const WithSingleAction: StoryObj<typeof EmptyState> = {
  args: {
    actions: [
      <Button key="setup-test" variant="contained" size="large">
        Setup Test
      </Button>
    ],
    icon: <AddToQueue />,
    subtitle: "Set up tests to view the results here.",
    title: "Setup Test"
  },
  render: Template
};

export const WithoutActions: StoryObj<typeof EmptyState> = {
  args: {
    icon: <img src={ResultImage} alt="Icon" />,
    subtitle: "Run a test to view results here o upload existing result",
    title: "No Results Found"
  },
  render: Template
};

export const WithoutTitle: StoryObj<typeof EmptyState> = {
  args: {
    actions: [
      <Button key="add-model" variant="outlined" size="large">
        <AddOutlined sx={{ mr: 1 }} />
        ADD MODEL
      </Button>
    ],
    icon: <img src={BuildImage} alt="Icon" />,
    subtitle: "No Vehicle Control Unit is available"
  },
  render: Template
};
