import React from "react";
import { action } from "@storybook/addon-actions";
import { AppBar, Toolbar } from "@material-ui/core";

import UserMenu from "./UserMenu";

export default {
  title: "Layout/UserMenu",
  component: UserMenu
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
