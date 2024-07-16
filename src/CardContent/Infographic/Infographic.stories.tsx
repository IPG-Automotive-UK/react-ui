import { Meta, StoryFn } from "@storybook/react";

import Infographic from "./Infographic";
import { InfographicProps } from "./Infographic.types";
import React from "react";

/**
 * Story metadata
 */
const meta: Meta<typeof Infographic> = {
  component: Infographic,
  title: "CardContent/Infographic"
};
export default meta;

const Template: StoryFn<InfographicProps> = args => {
  return <Infographic {...args} />;
};

export const Default = {
  args: {
    media: "https://picsum.photos/336/190"
  },

  render: Template
};

export const WithVersionChip = {
  args: {
    media: "https://picsum.photos/336/190",
    version: "1.0"
  },

  render: Template
};
