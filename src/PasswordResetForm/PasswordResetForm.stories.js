import React from "react";
import { action } from "@storybook/addon-actions";

import PasswordResetForm from "./PasswordResetForm";

export default {
  title: "Authentication/PasswordResetForm",
  component: PasswordResetForm
};

const Template = args => {
  return <PasswordResetForm {...args} onReset={action("password reset")} />;
};

export const Default = Template.bind({});
Default.args = {};

export const Loading = Template.bind({});
Loading.args = {
  loading: true
};
