import { Box, CssBaseline, Drawer, useMediaQuery } from "@mui/material";
import React, { Fragment, useState } from "react";

import { ConfirmProvider } from "../ConfirmProvider";
import Sidebar from "../Sidebar";
import { SnackbarProvider } from "../SnackbarProvider";
import ThemeProvider from "../ThemeProvider";
import VirtoAppHeader from "../VirtoAppHeader";
import { VirtoAppLayoutProps } from "./VirtoAppLayout.types";

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
}: VirtoAppLayoutProps) {
  // sidebar styling
  const sidebarWidth = 240;

  // define state for managing dynamic sidebar
  const [mobileOpen, setMobileOpen] = useState(false);

  const [appOpen, setAppOpen] = useState(false);

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
        <VirtoAppHeader
          appName={appName}
          onMenuClick={() => setMobileOpen(!mobileOpen)}
          onAppClick={() => setAppOpen(!appOpen)}
          onChangePassword={onChangePassword}
          onLogout={onLogout}
          username={username}
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
            <Sidebar appVersion={appVersion}>{sidebarContent}</Sidebar>
          </Drawer>
        </Box>
        <Box
          sx={{
            background: theme => theme.vars.palette.background.default,
            display: "flex",
            flexDirection: "column",
            flexGrow: 1
          }}
        >
          <Box sx={theme => theme.mixins.toolbar} />
          <Box
            id="virto-app-layout-page-content"
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
function VirtoAppLayout({
  appVersion,
  baseUrl,
  sidebarContent,
  virtoLogoLinkUrl = "",
  appName,
  onChangePassword,
  onLogout,
  username,
  content
}: VirtoAppLayoutProps) {
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

export default VirtoAppLayout;
