import { Box, CssBaseline, Drawer, Hidden } from "@mui/material";
import React, { Fragment, useState } from "react";

import { AppLayoutProps } from "./AppLayout.types";
import { ConfirmProvider } from "../ConfirmProvider";
import Sidebar from "../Sidebar";
import SnackbarProvider from "../SnackbarProvider";
import ThemeProvider from "../ThemeProvider";
import VirtoAppHeader from "../VirtoAppHeader";
import useTheme from "../ThemeProvider/useTheme";

// app layout component
function Layout({
  appVersion,
  baseUrl,
  sidebarContent,
  virtoLogoLinkUrl = "",
  appName,
  onChangePassword,
  onLogout,
  username,
  content
}: AppLayoutProps) {
  // sidebar styling
  const sidebarWidth = 240;

  // define state for managing dynamic sidebar
  const [mobileOpen, setMobileOpen] = useState(false);

  const [appOpen, setAppOpen] = useState(false);

  // use theme context hook
  const [theme, setTheme] = useTheme();

  return (
    <Fragment>
      <Box height="100vh" display="flex">
        <CssBaseline />
        <VirtoAppHeader
          appName={appName}
          onMenuClick={() => setMobileOpen(!mobileOpen)}
          onAppClick={() => setAppOpen(!appOpen)}
          onChangePassword={onChangePassword}
          onLogout={onLogout}
          onColourModeChange={newMode => setTheme(newMode)}
          username={username}
          mode={theme as "light" | "dark"}
          baseUrl={baseUrl}
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
            sx={theme => ({
              height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
              overflow: "auto",
              [theme.breakpoints.down("md")]: {
                width: "100vw"
              },
              [theme.breakpoints.up("md")]: {
                width: `calc(100vw - ${sidebarWidth}px)`
              }
            })}
          >
            <SnackbarProvider>{content}</SnackbarProvider>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
}

// app layout wrapper component
function AppLayout({
  appVersion,
  baseUrl,
  sidebarContent,
  virtoLogoLinkUrl = "",
  appName,
  onChangePassword,
  onLogout,
  username,
  content
}: AppLayoutProps) {
  return (
    <ThemeProvider>
      <ConfirmProvider>
        <Layout
          appVersion={appVersion}
          baseUrl={baseUrl}
          sidebarContent={sidebarContent}
          virtoLogoLinkUrl={virtoLogoLinkUrl}
          appName={appName}
          onChangePassword={onChangePassword}
          onLogout={onLogout}
          username={username}
          content={content}
        />
      </ConfirmProvider>
    </ThemeProvider>
  );
}

export default AppLayout;
