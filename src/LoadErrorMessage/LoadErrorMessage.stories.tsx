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
  args: LoadErrorMessage.default404Props,
  render: Template
};

// HTTP 401
export const HTTP401: Story = {
  args: LoadErrorMessage.default401Props,
  render: Template
};

// General Error
export const GeneralError: Story = {
  args: LoadErrorMessage.defaultErrorProps,
  render: Template
};
