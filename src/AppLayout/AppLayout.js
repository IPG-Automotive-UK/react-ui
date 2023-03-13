import { Box, CssBaseline, Drawer, Hidden } from "@mui/material";
import React, { useState } from "react";

import AppHeader from "../AppHeader";
import PropTypes from "prop-types";
import Sidebar from "../Sidebar";
import SnackbarProvider from "../SnackbarProvider";
import ThemeProvider from "../ThemeProvider";
import useTheme from "../ThemeProvider/useTheme";

// app layout component
function Layout({
  appVersion,
  appUrls,
  sidebarContent,
  virtoLogoLinkUrl = null,
  appName,
  onChangePassword,
  onLogout,
  username,
  content,
  onMenuClick
}) {
  // sidebar styling
  const sidebarWidth = 240;

  // define state for managing dynamic sidebar
  const [mobileOpen, setMobileOpen] = useState(false);

  const [appOpen, setAppOpen] = useState(false);

  // use theme context hook
  const [theme, setTheme] = useTheme();

  return (
    <>
      <Box height="100vh" display="flex">
        <CssBaseline />
        <AppHeader
          appName={appName}
          onMenuClick={() => setMobileOpen(!mobileOpen)}
          onAppClick={() => setAppOpen(!appOpen)}
          onChangePassword={onChangePassword}
          onLogout={onLogout}
          onModeChange={newMode => setTheme(newMode)}
          username={username}
          mode={theme}
          appUrls={appUrls}
          virtoLogoLinkUrl={virtoLogoLinkUrl}
        />
        <Box
          sx={theme => ({
            [theme.breakpoints.up("md")]: {
              flexShrink: 0,
              width: sidebarWidth
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
                  paddingTop: "8px",
                  top: "64px",
                  width: sidebarWidth
                }
              }}
            >
              <Sidebar appVersion={appVersion}>{sidebarContent}</Sidebar>
            </Drawer>
          </Hidden>
          <Hidden mdDown>
            <Drawer
              sx={{
                "& .MuiDrawer-paper": {
                  height: `calc(100% - 64px)`,
                  paddingTop: "8px",
                  top: "64px",
                  width: sidebarWidth
                }
              }}
              variant="permanent"
              open
            >
              <Sidebar appVersion={appVersion}>{sidebarContent}</Sidebar>
            </Drawer>
          </Hidden>
        </Box>
        <Box
          flexGrow={1}
          display="flex"
          flexDirection="column"
          sx={{
            background: theme => theme.palette.background.default
          }}
        >
          <Box sx={theme => theme.mixins.toolbar} />
          <Box
            sx={{
              height: theme =>
                `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
              overflow: "auto"
            }}
          >
            <SnackbarProvider>{content}</SnackbarProvider>
          </Box>
        </Box>
      </Box>
    </>
  );
}

// app layout wrapper component
function AppLayout({
  appVersion,
  appUrls,
  sidebarContent,
  virtoLogoLinkUrl = null,
  appName,
  onChangePassword,
  onLogout,
  username,
  content
}) {
  return (
    <ThemeProvider>
      <Layout
        appVersion={appVersion}
        appUrls={appUrls}
        sidebarContent={sidebarContent}
        virtoLogoLinkUrl={virtoLogoLinkUrl}
        appName={appName}
        onChangePassword={onChangePassword}
        onLogout={onLogout}
        username={username}
        content={content}
      />
    </ThemeProvider>
  );
}

AppLayout.propTypes = {
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
   * The RHS content of the component app. Valid react element can be used.
   */
  content: PropTypes.node.isRequired,
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
   * The content of the component. Recommended children are SidebarItem and SidebarDivider, but any valid react element can be used.
   */
  sidebarContent: PropTypes.node.isRequired,
  /**
   * Name of currently logged in user.
   */
  username: PropTypes.string.isRequired,
  /**
   * A String of the href URL for the Link of the VIRTO Logo, default is null (link disabled)
   */
  virtoLogoLinkUrl: PropTypes.string
};

export default AppLayout;
