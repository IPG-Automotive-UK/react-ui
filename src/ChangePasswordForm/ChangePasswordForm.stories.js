import React from "react";
import { action } from "@storybook/addon-actions";

import ChangePasswordForm from "./ChangePasswordForm";

export default {
  title: "Authentication/ChangePasswordForm",
  component: ChangePasswordForm
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
