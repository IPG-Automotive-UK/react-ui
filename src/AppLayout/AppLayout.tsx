import { Box, CssBaseline, Drawer, Hidden } from "@mui/material";
import React, { Fragment, useState } from "react";

import AppHeader from "../AppHeader";
import { AppLayoutProps } from "./AppLayout.types";
import { ConfirmProvider } from "../ConfirmProvider";
import Sidebar from "../Sidebar";
import { SnackbarProvider } from "../SnackbarProvider";
import ThemeProvider from "../ThemeProvider";

// app layout component
function Layout({
  appVersion,
  sidebarContent,
  appName,
  onChangePassword,
  onLogout,
  username,
  content,
  headerChildren,
  mode = "light"
}: AppLayoutProps) {
  // sidebar styling
  const sidebarWidth = 100;

  // define state for managing dynamic sidebar
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Fragment>
      <Box height="100vh" display="flex">
        <CssBaseline />
        <AppHeader
          appName={appName}
          onChangePassword={onChangePassword}
          onLogout={onLogout}
          username={username}
          mode={mode}
        >
          {headerChildren}
        </AppHeader>
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
              <Sidebar showLogo={false} showVersion={false}>
                {sidebarContent}
              </Sidebar>
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
              <Sidebar
                showLogo={false}
                showVersion={appVersion !== undefined}
                appVersion={appVersion}
              >
                {sidebarContent}
              </Sidebar>
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
  appName,
  appVersion,
  baseUrl,
  content,
  headerChildren,
  onChangePassword,
  onLogout,
  sidebarContent,
  username,
  virtoLogoLinkUrl = ""
}: AppLayoutProps) {
  return (
    <ThemeProvider>
      <ConfirmProvider>
        <Layout
          appName={appName}
          appVersion={appVersion}
          baseUrl={baseUrl}
          content={content}
          headerChildren={headerChildren}
          onChangePassword={onChangePassword}
          onLogout={onLogout}
          sidebarContent={sidebarContent}
          username={username}
          virtoLogoLinkUrl={virtoLogoLinkUrl}
        />
      </ConfirmProvider>
    </ThemeProvider>
  );
}

export default AppLayout;
