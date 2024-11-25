import { Meta, StoryFn } from "@storybook/react";

import { CarMakerLogo } from "../SvgIcons";
import IconWithLabel from "./IconWithLabel";
import { IconWithLabelProps } from "./IconWithLabel.types";
import React from "react";

/**
 * Story metadata
 */
const meta: Meta<typeof IconWithLabel> = {
  argTypes: {
    icon: {
      control: false
    }
  },
  component: IconWithLabel,
  title: "General/IconWithLabel"
};
export default meta;

// Story Template
const Template: StoryFn<IconWithLabelProps> = args => {
  return <IconWithLabel {...args} />;
};

// Default
export const Default = {
  args: {
    href: "https://example.com",
    icon: <CarMakerLogo />,
    label: "Example"
  },
  render: Template
};

// Without href
export const WithoutHref = {
  args: {
    icon: <CarMakerLogo />,
    label: "Example"
  },
  render: Template
};
