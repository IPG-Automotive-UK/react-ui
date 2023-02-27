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

import AppsIcon from "@mui/icons-material/Apps";
import Menu from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import Sidebar from "../Sidebar";
import ToggleColorMode from "../ToggleColorMode";
import UserMenu from "../UserMenu";

// app header component
function AppHeader({
  appVersion,
  children,
  logoLinkUrl = null,
  appName,
  onChangePassword,
  onLogout,
  onChange,
  mode
}) {
  // define state for managing dynamic sidebar
  const [mobileOpen, setMobileOpen] = useState(false);

  const [appOpen, setAppOpen] = useState(false);
  return (
    <>
      <AppBar
        sx={theme => ({
          backgroundColor:
            theme.palette.mode === "light"
              ? theme.palette.primary.main
              : theme.palette.primary.dark
        })}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
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
                  width: "300px"
                }
              }}
            >
              <Sidebar logoLinkUrl={logoLinkUrl} appVersion={appVersion}>
                {children}
              </Sidebar>
            </Drawer>
          </Hidden>
          <Box display="flex" alignItems="center">
            <IconButton
              color="inherit"
              aria-label="open menu"
              edge="start"
              onClick={() => setMobileOpen(!appOpen)}
              sx={theme => ({
                pl: 0,
                [theme.breakpoints.up("md")]: {
                  display: "none"
                }
              })}
              size="large"
            >
              <Menu sx={{ color: "#fff", fontSize: "30px" }} />
            </IconButton>
            <IconButton
              sx={{ mr: 1, pl: 0 }}
              onClick={() => setAppOpen(!appOpen)}
            >
              <AppsIcon sx={{ color: "#fff", fontSize: "30px" }} />
            </IconButton>
            <Box
              component={"img"}
              src={"/VIRTO-white.svg"}
              height={20}
              mr={1}
            />
            <Typography variant="h6" fontSize="24px" color="#fff">
              {appName}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <ToggleColorMode mode={mode} onChange={onChange} />
            <UserMenu
              username="Ruud van Nistelrooy"
              onChangePassword={onChangePassword}
              onLogout={onLogout}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={theme => ({
          [theme.breakpoints.up("md")]: {
            flexShrink: 0,
            width: "300px"
          }
        })}
      >
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
                width: "300px"
              }
            }}
          >
            <Sidebar logoLinkUrl={logoLinkUrl} appVersion={appVersion}>
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
                width: "300px"
              }
            }}
            variant="permanent"
            open
          >
            <Sidebar logoLinkUrl={logoLinkUrl} appVersion={appVersion}>
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
  appName: PropTypes.string,
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
  onLogout: PropTypes.func.isRequired
};

export default AppHeader;
