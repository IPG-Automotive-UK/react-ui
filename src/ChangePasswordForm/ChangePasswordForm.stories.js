import ChangePasswordForm from "./ChangePasswordForm";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: ChangePasswordForm,
  title: "Authentication/ChangePasswordForm"
};

const Template = args => {
  return <ChangePasswordForm {...args} onReset={action("password reset")} />;
};

export const Default = Template.bind({});
Default.args = {};

export const Loading = Template.bind({});
Loading.args = {
  loading: true
};
