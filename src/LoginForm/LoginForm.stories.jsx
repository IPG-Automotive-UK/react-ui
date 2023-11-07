import LoginForm from "./LoginForm";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: LoginForm,
  title: "Authentication/LoginForm"
};

const Template = args => {
  return <LoginForm {...args} onLogin={action("login")} />;
};

export const Default = {
  args: {},
  render: Template
};

export const Loading = {
  args: {
    loading: true
  },

  render: Template
};
