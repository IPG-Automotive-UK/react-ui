import FeedbackForm from "./FeedbackForm";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: FeedbackForm,
  title: "General/FeedbackForm"
};

const Template = args => {
  const onSubmit = (event, value) => {
    action("onSubmit")(event, value);
  };
  return <FeedbackForm {...args} onSubmit={onSubmit} />;
};

export const Default = Template.bind({});
Default.args = {
  open: false
};
