import { Avatar, Button } from "@mui/material";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { AddToQueue } from "@mui/icons-material";
import EmptyState from "./EmptyState";
import React from "react";

export default {
  component: EmptyState,
  title: "Layout/EmptyState"
} satisfies Meta<typeof EmptyState>;

const Template: StoryFn<typeof EmptyState> = args => <EmptyState {...args} />;

export const Default: StoryObj<typeof EmptyState> = {
  args: {
    actions: [
      <Button key="default-action" variant="contained" size="large">
        Action
      </Button>
    ],
    icon: <Avatar />,
    subtitle: "Subtitle",
    title: "Title"
  },
  render: Template
};

export const VirtoBuild: StoryObj<typeof EmptyState> = {
  args: {
    actions: [
      <Button key="upload-prototype" variant="outlined" size="large">
        UPLOAD PROTOTYPE
      </Button>,
      <Button key="build-prototype" variant="contained" size="large">
        BUILD PROTOTYPE
      </Button>
    ],
    icon: <AddToQueue />,
    subtitle:
      "Build your virtual vehicle or upload a design to view the prototypes.",
    title: "Let's Start Building"
  },
  render: Template
};

export const VirtoTest: StoryObj<typeof EmptyState> = {
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

export const NoIcon: StoryObj<typeof EmptyState> = {
  args: {
    actions: [
      <Button key="add-item" variant="outlined" size="medium">
        Add New Item
      </Button>
    ],
    subtitle: "There are currently no items to display.",
    title: "No Data Available"
  },
  render: Template
};

export const MultipleActions: StoryObj<typeof EmptyState> = {
  args: {
    actions: [
      <Button key="primary-action" variant="contained" size="medium">
        Primary Action
      </Button>,
      <Button key="secondary-action" variant="outlined" size="medium">
        Secondary Action
      </Button>
    ],
    subtitle: "You can add multiple action buttons",
    title: "Multiple Actions"
  },
  render: Template
};
