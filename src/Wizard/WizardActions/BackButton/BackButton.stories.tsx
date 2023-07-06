import { Meta, Story } from "@storybook/react";

import BackButton from "./BackButton";
import { BackButtonProps } from "./BackButton.types";
import React from "react";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof BackButton> = {
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
  disabled: false,
  onClick: action("onClick")
};
