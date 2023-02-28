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

import AppLauncher from "../AppLauncher";
import AppsIcon from "@mui/icons-material/Apps";
import Menu from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import Sidebar from "../Sidebar";
import ToggleColorMode from "../ToggleColorMode";
import UserMenu from "../UserMenu";
import VirtoLogo from "../SvgIcons/VirtoLogo";

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
            <VirtoLogo
              sx={{
                color: theme =>
                  theme.palette.mode === "dark" ? "#003063" : "white",
                height: 20,
                width: 95
              }}
            />
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
  appUrls,
  children,
  IpgLogoLinkUrl = null,
  VirtoLogoLinkUrl = null,
  appName,
  onChangePassword,
  onLogout,
  onModeChange,
  mode,
  username,
  showIpgLogo = true,
  showVirtoLogo = true,
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
        onChange={onModeChange}
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
            <AppLauncher
              appUrls={appUrls}
              logoLinkUrl={VirtoLogoLinkUrl}
              showLogo={showVirtoLogo}
            />
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
              logoLinkUrl={IpgLogoLinkUrl}
              appVersion={appVersion}
              showLogo={showIpgLogo}
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
              logoLinkUrl={IpgLogoLinkUrl}
              appVersion={appVersion}
              showLogo={showIpgLogo}
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
   * A String of the href URL for the Link of the IPG Logo, default is null (link disabled)
   */
  IpgLogoLinkUrl: PropTypes.string,
  /**
   * A String of the href URL for the Link of the VIRTO Logo, default is null (link disabled)
   */
  VirtoLogoLinkUrl: PropTypes.string,
  /**
   * App version to display in header.
   */
  appName: PropTypes.string.isRequired,
  /**
   *  List of apps to display in the AppLauncher
   * @default []
   * @type {array}
   * @example
   * [
   * {
   * "VIRTO.BUILD": "https://someurl.com",
   * "VIRTO.ID": "https://someurl.com",
   * }
   * ]
   */
  appUrls: PropTypes.array,
  /**
   * App version to display at base of sidebar.
   */
  appVersion: PropTypes.string,
  /**
   * The content of the component. Recommended children are SidebarItem and SidebarDivider, but any valid react element can be used.
   */
  children: PropTypes.node,

  /**
   * The color mode selection
   * @default "light"
   */
  mode: PropTypes.oneOf(["light", "dark"]),
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
   * Callback fired when the color mode is changed.
   *
   * **Signature**
   * ```
   * function(newMode) => void
   * ```
   *
   * _newMode_: The new color mode that has been selected
   */
  onModeChange: PropTypes.func.isRequired,
  /**
   * Boolean to determine if IPG logo should be displayed at the bottom of the sidebar
   */
  showIpgLogo: PropTypes.bool,
  /**
   * Boolean to determine if version should be displayed at the bottom of the sidebar
   */
  showVersion: PropTypes.bool,
  /**
   * Boolean to determine if IPG logo should be displayed at the bottom of the sidebar
   */
  showVirtoLogo: PropTypes.bool,
  /**
   * Name of currently logged in user.
   */
  username: PropTypes.string.isRequired
};

export default AppHeader;
