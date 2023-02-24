import AppHeader from "./AppHeader";
import React from "react";
import UserMenu from "../UserMenu";
import { action } from "@storybook/addon-actions";

export default {
  component: AppHeader,
  title: "Layout/AppHeader"
};

const Template = args => {
  console.log("args", args);
  return <AppHeader {...args} />;
};

// default story
export const Default = Template.bind({});
Default.args = {
  logoUrl: "https://via.placeholder.com/150",
  title: "APP NAME"
};

export const WithUserMenu = Template.bind({});
WithUserMenu.args = {
  ...Default.args,
  children: <UserMenu username="Man van Nistelrooy" />
};
