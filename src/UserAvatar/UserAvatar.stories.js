import React from "react";
import UserAvatar from "./UserAvatar";

export default {
  component: UserAvatar,
  title: "General/UserAvatar"
};

const Template = args => {
  return <UserAvatar {...args} />;
};

export const Default = {
  render: Template,

  args: {
    color: "rgb(0,0,0)",
    img: "",
    name: ""
  }
};
