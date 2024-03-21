import React from "react";
import { StoryFn } from "@storybook/react";
import ValidatedInput from "./";
import { ValidatedInputProps } from "./ValidatedInput.types";

export default {
  component: ValidatedInput,
  title: "ValidatedForm/ValidatedInput"
};

const Template: StoryFn<ValidatedInputProps> = args => {
  return <ValidatedInput {...args} />;
};

export const Default = {
  args: {},
  render: Template
};
