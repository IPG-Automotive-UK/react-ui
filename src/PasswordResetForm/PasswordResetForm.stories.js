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

export const Default = Template.bind({});
Default.args = {};

export const Loading = Template.bind({});
Loading.args = {
  loading: true
};
