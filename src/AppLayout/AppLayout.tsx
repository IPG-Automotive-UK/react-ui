import { Box, CssBaseline, Drawer, useMediaQuery } from "@mui/material";
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
  headerChildren
}: AppLayoutProps) {
  // sidebar styling
  const sidebarWidth = 100;

  // define state for managing dynamic sidebar
  const [mobileOpen, setMobileOpen] = useState(false);

  // check if screen is medium
  const isMediumScreen = useMediaQuery(theme => theme.breakpoints.down("md"));

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          height: "100vh"
        }}
      >
        <CssBaseline />
        <AppHeader
          appName={appName}
          onChangePassword={onChangePassword}
          onLogout={onLogout}
          username={username}
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
          <Drawer
            variant={isMediumScreen ? "temporary" : "permanent"}
            anchor="left"
            open={isMediumScreen ? mobileOpen : true}
            onClose={isMediumScreen ? () => setMobileOpen(false) : undefined}
            sx={theme => ({
              "& .MuiDrawer-paper": {
                height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
                paddingTop: "8px",
                top: theme.mixins.toolbar.minHeight,
                width: sidebarWidth
              }
            })}
          >
            <Sidebar
              showLogo={false}
              showVersion={isMediumScreen ? false : appVersion !== undefined}
              appVersion={appVersion}
            >
              {sidebarContent}
            </Sidebar>
          </Drawer>
        </Box>
        <Box
          sx={[
            {
              display: "flex",
              flexDirection: "column",
              flexGrow: 1
            },
            theme => ({
              background: theme.palette.background.default
            })
          ]}
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
