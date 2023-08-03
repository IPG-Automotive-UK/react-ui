import { AppBar, Box, Toolbar } from "@mui/material";
import { Meta, StoryFn } from "@storybook/react";

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

const DefaultTemplate: StoryFn<UserMenuProps> = args => (
  <div style={{ display: "flex", justifyContent: "flex-end" }}>
    <UserMenu
      {...args}
      onChangePassword={action("changePassword")}
      onLogout={action("logout")}
    />
  </div>
);

export const Default = {
  render: DefaultTemplate,
  args: { username: "Ruud van Nistelrooy" },

  parameters: {
    backgrounds: {
      default: "dark"
    }
  }
};

const AppBarTemplate: StoryFn<UserMenuProps> = args => {
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

export const InAppBar = {
  render: AppBarTemplate,
  args: { username: "Ruud van Nistelrooy" }
};
