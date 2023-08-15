import PasswordChangeForm from "./PasswordChangeForm";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: PasswordChangeForm,
  title: "Authentication/PasswordChangeForm"
};

const Template = args => {
  return <PasswordChangeForm {...args} onSubmit={action("password reset")} />;
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
