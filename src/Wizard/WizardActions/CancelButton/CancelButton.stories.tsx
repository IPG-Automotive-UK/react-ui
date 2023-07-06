import { Meta, Story } from "@storybook/react";

import CancelButton from "./CancelButton";
import { CancelButtonProps } from "./CancelButton.types";
import React from "react";

const meta: Meta<typeof CancelButton> = {
  argTypes: {
    onClick: {
      control: false
    }
  },
  component: CancelButton,
  title: "Wizard/CancelButton"
};
export default meta;

const Template: Story<CancelButtonProps> = args => {
  return <CancelButton {...args} />;
};

// default story
export const Default = Template.bind({});
Default.args = {
  disabled: false
};
