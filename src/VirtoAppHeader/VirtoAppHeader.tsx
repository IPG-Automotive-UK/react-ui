import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Link,
  Toolbar,
  Typography,
  useColorScheme
} from "@mui/material";
import React, { Fragment, useState } from "react";

import AppLauncher from "../AppLauncher";
import AppsIcon from "@mui/icons-material/Apps";
import Menu from "@mui/icons-material/Menu";
import ToggleColorMode from "../ToggleColorMode";
import UserMenu from "../UserMenu";
import { VirtoAppHeaderProps } from "./VirtoAppHeader.types";
import { VirtoLogo } from "../SvgIcons/VirtoLogo";

// appbar component
function Header({
  appName,
  onAppClick,
  onChangePassword,
  onLogout,
  onMenuClick,
  username,
  virtoLogoLinkUrl
}: VirtoAppHeaderProps) {
  // use hook from MUI to get and set the theme mode
  const { mode, setMode } = useColorScheme();
  return (
    <AppBar
      sx={theme => ({
        backgroundColor: theme.palette.primary.main
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
                color: theme.palette.background.paper,
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
                color: theme.palette.background.paper,
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
                  color: theme.palette.primary.contrastText,
                  height: 22,
                  mr: 0.4,
                  width: 110
                })}
              />
            </Link>
            <Typography
              variant="h6"
              sx={theme => ({
                color: theme.palette.primary.contrastText,
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
          <ToggleColorMode mode={mode} onChange={mode => setMode(mode)} />
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
function VirtoAppHeader({
  appName,
  baseUrl,
  onChangePassword,
  onLogout,
  onMenuClick,
  username,
  virtoLogoLinkUrl = ""
}: VirtoAppHeaderProps) {
  // sidebar styling
  const applancherWidth = 300;

  // define state for managing app launcher
  const [appOpen, setAppOpen] = useState(false);

  // handle click event
  const handleMenuClick =
    (cb: (event: React.MouseEvent<HTMLElement>) => void) =>
    (event: React.MouseEvent<HTMLElement>) => {
      cb(event);
    };

  return (
    <Fragment>
      <Header
        appName={appName}
        onAppClick={() => setAppOpen(!appOpen)}
        onChangePassword={onChangePassword}
        onLogout={onLogout}
        onMenuClick={handleMenuClick(onMenuClick)}
        username={username}
        virtoLogoLinkUrl={virtoLogoLinkUrl}
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
    </Fragment>
  );
}

export default VirtoAppHeader;
