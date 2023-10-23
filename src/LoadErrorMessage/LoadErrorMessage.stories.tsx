import { Meta, StoryFn } from "@storybook/react";

import LoadErrorMessage from "./LoadErrorMessage";
import { LoadErrorMessageProps } from "./LoadErrorMessage.types";
import React from "react";
import { action } from "@storybook/addon-actions";

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
    actionButtonText: "Refresh",
    contactTeam: "Support",
    errorDetails: "Component failed to load",
    message: "Something has gone wrong. Please refresh the page.",
    onButtonClick: action("Refresh action triggered"),
    showImg: true,
    supportUrl: "https://ipg-automotive.com/en/support/support-request/",
    title: "Failed to load"
  },
  render: Template
};

// User Login Error
export const UserLoginError = {
  args: {
    actionButtonText: "Log out",
    contactTeam: "Support",
    errorDetails: "Invalid token - length is 0",
    message:
      "Seems like there is an issue with user login account. Please log out and try logging in again.",
    onButtonClick: action("Logout action triggered"),
    showImg: true,
    supportUrl: "https://ipg-automotive.com/en/support/support-request/",
    title: "Failed to load"
  },
  render: Template
};

// Failed to fetch data
export const DataFetchError = {
  args: {
    contactTeam: "Support",
    errorDetails: "Failed to fetch users from VIRTO.ID: 400 Bad Request",
    message:
      "Seems like there is an issue fetching data. Please try again later.",
    showImg: true,
    supportUrl: "https://ipg-automotive.com/en/support/support-request/",
    title: "Failed to fetch data"
  },
  render: Template
};

// Failed to fetch data
export const TechnicalError = {
  args: {
    contactTeam: "Support",
    errorDetails: "No data found",
    message:
      "We're experiencing technical difficulties with our server right now. 😓",
    showImg: true,
    supportUrl: "https://ipg-automotive.com/en/support/support-request/",
    title: "Error!"
  },
  render: Template
};

// API Connection Error
export const APIError = {
  args: {
    contactTeam: "Support",
    errorDetails: "Unexpected token < in JSON at position 0",
    message: "This issue requires developer attention.",
    showImg: true,
    supportUrl: "https://ipg-automotive.com/en/support/support-request/",
    title: "API Connection Error"
  },
  render: Template
};

// Code Error
export const CodeError = {
  args: {
    contactTeam: "Support",
    errorDetails: "vehicless is not defined",
    message:
      "As this error is related to our code, a developer will need to investigate and fix it.",
    showImg: true,
    supportUrl: "https://ipg-automotive.com/en/support/support-request/",
    title: "Something is not right!"
  },
  render: Template
};
