import { FormProvider, useForm } from "@conform-to/react";

import React from "react";
import { StoryFn } from "@storybook/react";
import ValidatedInput from "./";
import { ValidatedInputProps } from "./ValidatedInput.types";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";

export default {
  component: ValidatedInput,
  title: "ValidatedForm/ValidatedInput"
};

const schema = z.object({
  autocomplete: z.enum(["apple", "banana", "cherry"], {
    errorMap: () => ({
      message: "Autocomplete is required"
    })
  }),
  checkbox: z.boolean().default(false),
  name: z.string().min(20, { message: "Name is required" }),
  number: z.number().min(10, { message: "Number should be greater than 10" })
});

const Template: StoryFn<ValidatedInputProps> = args => {
  const [form] = useForm({
    defaultValue: {
      autocomplete: "",
      checkbox: false,
      name: "",
      number: 0
    },
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema
      });
    },
    shouldValidate: "onBlur"
  });

  return (
    <FormProvider context={form.context}>
      <form id={form.id} onSubmit={form.onSubmit}>
        <ValidatedInput {...args} />;
      </form>
    </FormProvider>
  );
};

export const Default = {
  args: {
    kind: "text",
    label: "Name",
    name: "name",
    required: true
  },
  render: Template
};

export const Number = {
  args: {
    kind: "number",
    label: "Number",
    name: "number",
    required: true
  },
  render: Template
};

export const Autocomplete = {
  args: {
    kind: "select",
    label: "Autocomplete",
    name: "autocomplete",
    options: ["apple", "banana", "cherry"],
    required: true
  },
  render: Template
};

export const Boolean = {
  args: {
    kind: "switch",
    label: "Switch",
    name: "switch",
    options: ["yes", "no"]
  },
  render: Template
};

export const Checkbox = {
  args: {
    kind: "checkbox",
    label: "checkbox",
    name: "checkbox"
  },
  render: Template
};

export const Radio = {
  args: {
    kind: "radio",
    label: "Radio",
    name: "radio",
    options: ["apple", "banana", "cherry"]
  },
  render: Template
};

export const FileUploader = {
  args: {
    kind: "file-uploader",
    label: "File Uploader",
    name: "file-uploader"
  },
  render: Template
};
