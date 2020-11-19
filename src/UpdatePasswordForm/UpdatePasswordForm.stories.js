import React from "react";
import { action } from "@storybook/addon-actions";

import UpdatePasswordForm from "./UpdatePasswordForm";

export default {
  title: "Authentication/UpdatePasswordForm",
  component: UpdatePasswordForm
};

const Template = args => {
  return <UpdatePasswordForm {...args} onReset={action("password reset")} />;
};

export const Default = Template.bind({});
Default.args = {};

export const Loading = Template.bind({});
Loading.args = {
  loading: true
};
