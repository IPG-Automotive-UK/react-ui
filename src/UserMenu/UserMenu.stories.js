import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import UserMenu from "./UserMenu";
import { action } from "@storybook/addon-actions";

export default {
  component: UserMenu,
  title: "Layout/UserMenu"
};

const DefaultTemplate = args => (
  <div style={{ display: "flex", justifyContent: "flex-end" }}>
    <UserMenu
      {...args}
      onChangePassword={action("changePassword")}
      onLogout={action("logout")}
    />
  </div>
);

export const Default = DefaultTemplate.bind({});
Default.args = { username: "Ruud van Nistelrooy" };
Default.parameters = {
  backgrounds: {
    default: "dark"
  }
};

const AppBarTemplate = args => {
  return (
    <AppBar>
      <Toolbar style={{ justifyContent: "flex-end" }}>
        <UserMenu
          {...args}
          onChangePassword={action("changePassword")}
          onLogout={action("logout")}
        />
      </Toolbar>
    </AppBar>
  );
};

export const InAppBar = AppBarTemplate.bind({});
InAppBar.args = { username: "Ruud van Nistelrooy" };
