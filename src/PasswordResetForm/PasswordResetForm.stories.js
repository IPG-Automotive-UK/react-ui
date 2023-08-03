import PasswordResetForm from "./PasswordResetForm";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: PasswordResetForm,
  title: "Authentication/PasswordResetForm"
};

const Template = args => {
  return <PasswordResetForm {...args} onSubmit={action("reset")} />;
};

export const Default = {
  render: Template,
  args: {}
};

export const Loading = {
  render: Template,

  args: {
    loading: true
  }
};
