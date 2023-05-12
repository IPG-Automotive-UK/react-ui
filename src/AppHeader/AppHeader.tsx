import { AppBar, Box, Toolbar, Typography } from "@mui/material";

import { AppHeaderProps } from "./AppHeader.types";
import IpgLogo from "../SvgIcons/IpgLogo";
import React from "react";
import UserMenu from "../UserMenu";

// appbar component
function AppHeader({
  appLogo,
  appName,
  mode = "light",
  onChangePassword,
  onLogout,
  username,
  children
}: AppHeaderProps) {
  return (
    <AppBar
      sx={theme => ({
        backgroundColor: theme.palette.primary.main
      })}
    >
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <IpgLogo
            textColour={mode === "light" ? "white" : "black"}
            sx={{
              height: 50,
              width: 140
            }}
          />
        </Box>
        <Box display="flex" alignItems="center">
          {appLogo ? (
            <span>{appLogo}</span>
          ) : (
            <Typography
              variant="h6"
              fontSize="26px"
              lineHeight="34px"
              letterSpacing="0.05em"
              fontWeight="700"
              color={theme =>
                theme.palette.mode === "dark" ? "#003063" : "white"
              }
            >
              <span>{appName}</span>
            </Typography>
          )}
        </Box>
        <Box display="flex" alignItems="center">
          {children}
          <UserMenu
            username={username}
            onChangePassword={onChangePassword}
            onLogout={onLogout}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
