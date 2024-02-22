import { Meta, StoryFn, StoryObj } from "@storybook/react";

import LoadErrorMessage from "./LoadErrorMessage";
import { LoadErrorMessageProps } from "./LoadErrorMessage.types";
import React from "react";

/**
 * Story metadata
 */
const meta: Meta<typeof LoadErrorMessage> = {
  argTypes: {
    onButtonClick: {
      control: false
    }
  },
  component: LoadErrorMessage,
  title: "Card/LoadErrorMessage"
};
export default meta;

// Story Template
const Template: StoryFn<LoadErrorMessageProps> = args => {
  return <LoadErrorMessage {...args} />;
};

// Story type
type Story = StoryObj<typeof LoadErrorMessage>;

// Default
export const Default: Story = {
  args: {
    contactTeam: "Support",
    image: "virto-thinking",
    message: "Your message goes here.",
    title: "Title"
  },
  render: Template
};

// HTTP 404
export const HTTP404: Story = {
  args: {
    ...Default.args,
    actionButtonText: "Go back",
    contactTeam: "none",
    image: "virto-shrugging",
    message:
      "We're unable to locate the page you requested. Please ensure the URL is correct or explore other areas of the site.",
    title: "Sorry, the page doesn't exist!"
  },
  render: Template
};

// HTTP 401
export const HTTP401: Story = {
  args: {
    ...Default.args,
    actionButtonText: undefined,
    contactTeam: "none",
    message:
      "Sorry, but you don't have access to view this page. Contact an admin to request access.",
    title: "Access Denied!"
  },
  render: Template
};

// General Error
export const GeneralError: Story = {
  args: {
    ...Default.args,
    actionButtonText: "Refresh",
    contactUrl: "https://support.virto.com",
    errorDetails: "Invalid token - length is 0",
    image: "virto-head-scratching",
    message:
      "Oops! Something went wrong on our end 😓 Our team is actively addressing it and working to resolve the issue. Please try again later.",
    title: "Something is not right!"
  },
  render: Template
};
