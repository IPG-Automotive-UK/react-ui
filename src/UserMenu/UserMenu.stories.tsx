import { AppBar, Box, Toolbar } from "@mui/material";
import { Meta, Story } from "@storybook/react";

import React from "react";
import UserMenu from "./UserMenu";
import { UserMenuProps } from "./UserMenu.types";
import { action } from "@storybook/addon-actions";

/**
 * Story metadata
 */
const meta: Meta<typeof UserMenu> = {
  component: UserMenu,
  title: "Layout/UserMenu"
};
export default meta;

const DefaultTemplate: Story<UserMenuProps> = args => (
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

const AppBarTemplate: Story<UserMenuProps> = args => {
  return (
    <Box
      sx={{
        minHeight: 56,
        transform: "scale(1)",
        width: "100%"
      }}
    >
      <AppBar>
        <Toolbar style={{ justifyContent: "flex-end" }}>
          <UserMenu
            {...args}
            onChangePassword={action("changePassword")}
            onLogout={action("logout")}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export const InAppBar = AppBarTemplate.bind({});
InAppBar.args = { username: "Ruud van Nistelrooy" };
