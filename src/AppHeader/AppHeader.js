import {
  AppBar,
  Box,
  Drawer,
  Hidden,
  IconButton,
  Link,
  Toolbar,
  Typography
} from "@mui/material";
import React, { useState } from "react";

import AppLauncher from "../AppLauncher";
import AppsIcon from "@mui/icons-material/Apps";
import Menu from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import ToggleColorMode from "../ToggleColorMode";
import UserMenu from "../UserMenu";
import VirtoLogo from "../SvgIcons/VirtoLogo";

// appbar component
function Header({
  appName,
  mode,
  onAppClick,
  onChange,
  onChangePassword,
  onLogout,
  onMenuClick,
  username,
  virtoLogoLinkUrl
}) {
  return (
    <AppBar
      sx={theme => ({
        backgroundColor: theme.palette.primary.main
      })}
    >
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <IconButton sx={{ pl: 0 }} onClick={onAppClick} disableRipple>
            <AppsIcon
              sx={theme => ({
                color: theme.palette.background.paper,
                fontSize: "30px"
              })}
            />
          </IconButton>
          <IconButton
            disableRipple
            color="inherit"
            aria-label="open menu"
            edge="start"
            onClick={onMenuClick}
            sx={theme => ({
              pl: 2.5,
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
          <Box ml={1} display="flex" alignItems="center">
            <Link href={virtoLogoLinkUrl} underline="none" display="flex">
              <VirtoLogo
                sx={{
                  color: theme =>
                    theme.palette.mode === "dark" ? "#003063" : "white",
                  height: 22,
                  mr: 1,
                  width: 110
                }}
              />
            </Link>
            <Typography
              variant="h6"
              fontSize="28px"
              lineHeight="34px"
              letterSpacing="0.05em"
              textTransform="uppercase"
              fontWeight="700"
              color={theme =>
                theme.palette.mode === "dark" ? "#003063" : "white"
              }
            >
              {`. ${appName}`}
            </Typography>
          </Box>
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
  appName,
  appUrls,
  mode,
  onChangePassword,
  onLogout,
  onMenuClick,
  onModeChange,
  username,
  virtoLogoLinkUrl = null
}) {
  // sidebar styling
  const applancherWidth = 300;

  // define state for managing app launcher
  const [appOpen, setAppOpen] = useState(false);

  // handle click event
  const handleMenuClick = cb => event => {
    cb(event);
  };

  return (
    <>
      <Header
        appName={appName}
        mode={mode}
        onAppClick={() => setAppOpen(!appOpen)}
        onChange={onModeChange}
        onChangePassword={onChangePassword}
        onLogout={onLogout}
        onMenuClick={handleMenuClick(onMenuClick)}
        username={username}
        virtoLogoLinkUrl={virtoLogoLinkUrl}
      />
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
              width: applancherWidth
            }
          }}
        >
          <AppLauncher appUrls={appUrls} logoLinkUrl={virtoLogoLinkUrl} />
        </Drawer>
      </Hidden>
    </>
  );
}

AppHeader.propTypes = {
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
   * Callback fired when the user clicks on Menu icon.
   *
   * **Signature**
   * ```
   * function(event: object) => void
   * ```
   * _event_: The event source of the callback.
   */
  onMenuClick: PropTypes.func.isRequired,
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
   * Name of currently logged in user.
   */
  username: PropTypes.string.isRequired,
  /**
   * A String of the href URL for the Link of the VIRTO Logo, default is null (link disabled)
   */
  virtoLogoLinkUrl: PropTypes.string
};

export default AppHeader;
