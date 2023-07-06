import { Meta, Story } from "@storybook/react";

import BackButton from "./BackButton";
import { BackButtonProps } from "./BackButton.types";
import React from "react";

const meta: Meta<typeof BackButton> = {
  argTypes: {
    onClick: {
      control: false
    }
  },
  component: BackButton,
  title: "Wizard/BackButton"
};
export default meta;

const Template: Story<BackButtonProps> = args => {
  return <BackButton {...args} />;
};

// default story
export const Default = Template.bind({});
Default.args = {
  disabled: false
};
