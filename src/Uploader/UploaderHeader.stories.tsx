import { Meta, StoryFn, StoryObj } from "@storybook/react";
import React from "react";
import UploaderHeader from "./UploaderHeader";
import { UploaderHeaderProps } from "./UploaderHeader.types";

export default {
  component: UploaderHeader,
  title: "Uploader/UploaderHeader"
} satisfies Meta<typeof UploaderHeader>;

const Template: StoryFn<UploaderHeaderProps> = args => {
  return <UploaderHeader {...args} />;
};

export const Default: StoryObj<typeof UploaderHeader> = {
  args: {
    disabled: false,
    required: true,
    showDelete: true,
    subText: "Please upload your file to continue",
    title: "CarMaker"
  },

  render: Template
};
