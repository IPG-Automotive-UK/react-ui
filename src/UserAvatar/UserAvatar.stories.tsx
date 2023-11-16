import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import UserAvatar from "./UserAvatar";
import { UserAvatarProps } from "./UserAvatar.types";

/**
 * Story metadata
 */
const meta: Meta<typeof UserAvatar> = {
  component: UserAvatar,
  title: "General/UserAvatar"
};
export default meta;

const Template: StoryFn<UserAvatarProps> = args => {
  return <UserAvatar {...args} />;
};

export const Default = {
  args: {
    color: "rgb(0,0,0)",
    img: "",
    name: ""
  },

  render: Template
};
