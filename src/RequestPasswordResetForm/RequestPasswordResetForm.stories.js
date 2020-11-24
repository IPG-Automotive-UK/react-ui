import React from "react";
import RequestPasswordResetForm from "./RequestPasswordResetForm";
import { action } from "@storybook/addon-actions";

export default {
  component: RequestPasswordResetForm,
  title: "Authentication/RequestPasswordResetForm"
};

const Template = args => {
  return <RequestPasswordResetForm {...args} onSubmit={action("reset")} />;
};

export const Default = Template.bind({});
Default.args = {};

export const Loading = Template.bind({});
Loading.args = {
  loading: true
};
