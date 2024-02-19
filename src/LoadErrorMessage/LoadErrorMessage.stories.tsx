import { Meta, StoryFn } from "@storybook/react";

import LoadErrorMessage from "./LoadErrorMessage";
import { LoadErrorMessageProps } from "./LoadErrorMessage.types";
import React from "react";

/**
 * Story metadata
 */
const meta: Meta<typeof LoadErrorMessage> = {
  component: LoadErrorMessage,
  title: "Card/LoadErrorMessage"
};
export default meta;

// Story Template
const Template: StoryFn<LoadErrorMessageProps> = args => {
  return <LoadErrorMessage {...args} />;
};

// Default
export const Default = {
  args: {
    contactTeam: "Support",
    image: "virto-thinking",
    message: "Your message goes here.",
    title: "Title"
  },
  render: Template
};

// HTTP 404
export const HTTP404 = {
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
export const HTTP401 = {
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
export const GeneralError = {
  args: {
    ...Default.args,
    actionButtonText: "Refresh",
    errorDetails: "Invalid token - length is 0",
    image: "virto-head-scratching",
    message:
      "Oops! Something went wrong on our end 😓 Our team is actively addressing it and working to resolve the issue. Please try again later.",
    supportUrl: "https://support.virto.com",
    title: "Something is not right!"
  },
  render: Template
};
