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
        <Box
          sx={{
            alignItems: "center",
            display: "flex"
          }}
        >
          <IpgLogo
            textColour={mode === "light" ? "white" : "black"}
            sx={{
              height: 33,
              width: 119
            }}
          />
        </Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex"
          }}
        >
          {appLogo ? (
            <span>{appLogo}</span>
          ) : (
            <Typography
              variant="h6"
              sx={theme => ({
                color: theme.palette.primary.contrastText,
                fontSize: "20px",
                fontWeight: "600",
                letterSpacing: "0.05em",
                lineHeight: "34px"
              })}
            >
              <span>{appName}</span>
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex"
          }}
        >
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
