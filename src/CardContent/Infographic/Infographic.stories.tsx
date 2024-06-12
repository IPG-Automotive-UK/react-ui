import { Meta, StoryFn } from "@storybook/react";

import Infographic from "./Infographic";
import { InfographicProps } from "./Infographic.types";
import React from "react";
import VersionChip from "../../VersionChip/VersionChip";

// import exampleImage from "./exampleRoadImage.png";

/**
 * Story metadata
 */
const meta: Meta<typeof Infographic> = {
  component: Infographic,
  title: "Card/ImageCard"
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
    versionChip: (
      <VersionChip version="1.0" versionType="major" selected={true} />
    )
  },

  render: Template
};
