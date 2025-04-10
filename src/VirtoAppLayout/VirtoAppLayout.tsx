import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Link,
  Toolbar,
  Typography,
  useMediaQuery
} from "@mui/material";
import { HeaderProps, VirtoAppLayoutProps } from "./VirtoAppLayout.types";
import React, { Fragment, useState } from "react";

import AppLauncher from "../AppLauncher";
import AppsIcon from "@mui/icons-material/Apps";
import { ConfirmProvider } from "../ConfirmProvider";
import Menu from "@mui/icons-material/Menu";
import Sidebar from "../Sidebar";
import { SnackbarProvider } from "../SnackbarProvider";
import ThemeProvider from "../ThemeProvider";
import UserMenu from "../UserMenu";
import { VirtoLogo } from "../SvgIcons/VirtoLogo";

// Merged Header into VirtoAppLayout to remove redundancy and avoid maintaining a separate VirtoAppHeader component.
function Header({
  appName,
  onAppClick,
  onChangePassword,
  onLogout,
  onMenuClick,
  user,
  virtoLogoLinkUrl,
  customerLogo
}: HeaderProps) {
  return (
    <AppBar
      sx={theme => ({
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: 0
      })}
    >
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex"
          }}
        >
          <IconButton sx={{ pl: 0 }} onClick={onAppClick} disableRipple>
            <AppsIcon
              sx={theme => ({
                color: theme.palette.primary.main,
                fontSize: "30px"
              })}
            />
          </IconButton>
          <IconButton
            disableRipple
            color="inherit"
            data-testid="launcher-button"
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
                color: theme.palette.primary.main,
                fontSize: "30px"
              })}
            />
          </IconButton>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              ml: 1
            }}
          >
            <Link
              href={virtoLogoLinkUrl}
              underline="none"
              sx={{
                display: "flex"
              }}
            >
              <VirtoLogo
                data-testid="virto-logo"
                sx={theme => ({
                  color: theme.palette.primary.main,
                  height: 22,
                  mr: 0.4,
                  width: 110
                })}
              />
            </Link>
            <Typography
              variant="h6"
              sx={theme => ({
                color: theme.palette.primary.main,
                fontSize: "28px",
                fontWeight: "700",
                letterSpacing: "0.05em",
                lineHeight: "34px",
                textTransform: "uppercase"
              })}
            >
              {`.`}
              <span style={{ marginLeft: "7px" }}>{appName}</span>
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex"
          }}
        >
          {customerLogo ? (
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                height: 40,
                justifyContent: "flex-end",
                mr: 2,
                width: 160
              }}
            >
              <Box
                component="img"
                src={customerLogo}
                alt="Customer Logo"
                sx={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain"
                }}
              />
            </Box>
          ) : null}
          <UserMenu
            user={user}
            onChangePassword={onChangePassword}
            onLogout={onLogout}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// app layout component
function Layout({
  appVersion,
  baseUrl,
  sidebarContent,
  virtoLogoLinkUrl = "",
  appName,
  onChangePassword,
  onLogout,
  user,
  content,
  customerLogo
}: VirtoAppLayoutProps) {
  // sidebar styling
  const sidebarWidth = 240;

  const applancherWidth = 300;

  // define state for managing dynamic sidebar
  const [mobileOpen, setMobileOpen] = useState(false);

  // define state for managing app launcher
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
        <Header
          appName={appName}
          onAppClick={() => setAppOpen(!appOpen)}
          onChangePassword={onChangePassword}
          onLogout={onLogout}
          onMenuClick={() => setMobileOpen(!mobileOpen)}
          user={user}
          virtoLogoLinkUrl={virtoLogoLinkUrl}
          customerLogo={customerLogo}
        />
        <Drawer
          variant="temporary"
          anchor="left"
          data-testid="app-launcher"
          open={appOpen}
          onClose={() => setAppOpen(false)}
          sx={theme => ({
            "& .MuiDrawer-paper": {
              height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
              top: theme.mixins.toolbar.minHeight,
              width: applancherWidth
            }
          })}
        >
          <AppLauncher
            baseUrl={baseUrl}
            logoLinkUrl={virtoLogoLinkUrl}
            onAppButtonClick={() => setAppOpen(false)}
          />
        </Drawer>
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
            sx={theme => {
              // get toolbar height
              const toolbarHeight =
                typeof theme?.mixins?.toolbar?.minHeight === "number"
                  ? theme.mixins.toolbar.minHeight
                  : 65;

              return {
                "& .MuiDrawer-paper": {
                  height: `calc(100vh - ${toolbarHeight + 1}px)`,
                  marginTop: "1px",
                  paddingTop: "8px",
                  top: toolbarHeight,
                  width: sidebarWidth
                }
              };
            }}
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
  user,
  content,
  customerLogo
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
          user={user}
          content={content}
          customerLogo={customerLogo}
        />
      </ConfirmProvider>
    </ThemeProvider>
  );
}

export default VirtoAppLayout;
