import { Meta, StoryFn, StoryObj } from "@storybook/react";

import { AddOutlined } from "@mui/icons-material";
import BuildImage from "../../static/BuildImage.svg";
import { Button } from "@mui/material";
import EmptyState from "./EmptyState";
import Layer1 from "../../static/Layer1.svg";
import React from "react";
import ResultImage from "../../static/ResultImage.svg";
import TestLogo from "../../static/TestLogo.svg";

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
    icon: <img src={TestLogo} alt="Icon" />,
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
    icon: (
      <img
        src={Layer1}
        alt="Icon"
        style={{
          marginBottom: 31,
          marginRight: 35,
          marginTop: 36
        }}
      />
    ),
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
    icon: <img src={TestLogo} alt="Icon" />,
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
