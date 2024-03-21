import React from "react";
import { StoryFn } from "@storybook/react";
import { ValidatedForm } from "remix-validated-form";
import ValidatedInput from "./";
import { ValidatedInputProps } from "./ValidatedInput.types";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

export default {
  component: ValidatedInput,
  title: "ValidatedForm/ValidatedInput"
};

const validator = withZod(
  z.object({
    name: z.string().min(1, { message: "Name is required" })
  })
);

const Template: StoryFn<ValidatedInputProps> = args => {
  return (
    <ValidatedForm validator={validator}>
      <ValidatedInput {...args} />;
    </ValidatedForm>
  );
};

export const Default = {
  args: {},
  render: Template
};
