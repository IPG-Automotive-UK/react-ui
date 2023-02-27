import {
  AppBar,
  Box,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Typography
} from "@mui/material";
import React, { useState } from "react";

import AppLogo from "./AppLogo";
import AppsIcon from "@mui/icons-material/Apps";
import Menu from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import Sidebar from "../Sidebar";
import ToggleColorMode from "../ToggleColorMode";
import UserMenu from "../UserMenu";

// appbar component
function Header({
  appName,
  onMenuClick,
  onAppClick,
  username,
  mode,
  onChange,
  onChangePassword,
  onLogout
}) {
  return (
    <AppBar
      sx={theme => ({
        backgroundColor:
          theme.palette.mode === "light"
            ? theme.palette.primary.main
            : theme.palette.primary.dark
      })}
    >
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <IconButton
            color="inherit"
            aria-label="open menu"
            edge="start"
            onClick={onMenuClick}
            sx={theme => ({
              pl: 0,
              [theme.breakpoints.up("md")]: {
                display: "none"
              }
            })}
            size="large"
          >
            <Menu
              sx={theme => ({
                color: theme.palette.background.paper,
                fontSize: "30px"
              })}
            />
          </IconButton>
          <IconButton sx={{ mr: 1, pl: 0 }} onClick={onAppClick}>
            <AppsIcon
              sx={theme => ({
                color: theme.palette.background.paper,
                fontSize: "30px"
              })}
            />
          </IconButton>
          <Box mr={1} display="flex" alignItems="center">
            <AppLogo />
          </Box>
          <Typography
            variant="h6"
            fontSize="24px"
            color={theme => theme.palette.background.paper}
          >
            {appName}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <ToggleColorMode mode={mode} onChange={onChange} />
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

// app header component
function AppHeader({
  appVersion,
  children,
  logoLinkUrl = null,
  appName,
  onChangePassword,
  onLogout,
  onChange,
  mode,
  username,
  showLogo = true,
  showVersion = true
}) {
  // sidebar styling
  const sidebarWidth = 240;
  const appbarWidth = 300;

  // define state for managing dynamic sidebar
  const [mobileOpen, setMobileOpen] = useState(false);

  const [appOpen, setAppOpen] = useState(false);
  return (
    <>
      <Header
        appName={appName}
        onMenuClick={() => setMobileOpen(!mobileOpen)}
        onAppClick={() => setAppOpen(!appOpen)}
        onChangePassword={onChangePassword}
        onLogout={onLogout}
        onChange={onChange}
        username={username}
        mode={mode}
      />
      <Box
        sx={theme => ({
          [theme.breakpoints.up("md")]: {
            flexShrink: 0,
            width: sidebarWidth
          }
        })}
      >
        <Hidden>
          <Drawer
            variant="temporary"
            anchor="left"
            open={appOpen}
            onClose={() => setAppOpen(false)}
            sx={{
              "& .MuiDrawer-paper": {
                height: `calc(100% - 64px)`,
                top: "64px",
                width: appbarWidth
              }
            }}
          >
            <Sidebar logoLinkUrl={logoLinkUrl} appVersion={appVersion}>
              {children}
            </Sidebar>
          </Drawer>
        </Hidden>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            sx={{
              "& .MuiDrawer-paper": {
                height: `calc(100% - 64px)`,
                top: "64px",
                width: sidebarWidth
              }
            }}
          >
            <Sidebar
              logoLinkUrl={logoLinkUrl}
              appVersion={appVersion}
              showLogo={showLogo}
              showVersion={showVersion}
            >
              {children}
            </Sidebar>
          </Drawer>
        </Hidden>
        <Hidden mdDown>
          <Drawer
            sx={{
              "& .MuiDrawer-paper": {
                height: `calc(100% - 64px)`,
                top: "64px",
                width: sidebarWidth
              }
            }}
            variant="permanent"
            open
          >
            <Sidebar
              logoLinkUrl={logoLinkUrl}
              appVersion={appVersion}
              showLogo={showLogo}
              showVersion={showVersion}
            >
              {children}
            </Sidebar>
          </Drawer>
        </Hidden>
      </Box>
    </>
  );
}

AppHeader.propTypes = {
  /**
   * App version to display in header.
   */
  appName: PropTypes.string.isRequired,
  /**
   * App version to display at base of sidebar.
   */
  appVersion: PropTypes.string,
  /**
   * The content of the component. Recommended children are SidebarItem and SidebarDivider, but any valid react element can be used.
   */
  children: PropTypes.node,
  /**
   * A String of the href URL for the Link of the IPG Logo, default is null (link disabled)
   */
  logoLinkUrl: PropTypes.string,
  /**
   * The color mode selection
   * @default "light"
   */
  mode: PropTypes.oneOf(["light", "dark"]),
  /**
   * Callback fired when the color mode is changed.
   *
   * **Signature**
   * ```
   * function(newMode) => void
   * ```
   *
   * _newMode_: The new color mode that has been selected
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Callback fired when the user clicks on "Change password".
   *
   * **Signature**
   * ```
   * function(event: object) => void
   * ```
   * _event_: The event source of the callback.
   */
  onChangePassword: PropTypes.func.isRequired,
  /**
   * Callback fired when the user clicks on "Logout".
   *
   * **Signature**
   * ```
   * function(event: object) => void
   * ```
   * _event_: The event source of the callback.
   */
  onLogout: PropTypes.func.isRequired,
  /**
   * Boolean to determine if logo should be displayed at the top of the sidebar
   */
  showLogo: PropTypes.bool,
  /**
   * Boolean to determine if version should be displayed at the bottom of the sidebar
   */
  showVersion: PropTypes.bool,
  /**
   * Name of currently logged in user.
   */
  username: PropTypes.string.isRequired
};

export default AppHeader;
