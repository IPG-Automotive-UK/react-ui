import { Box, Divider, Link, Paper, Typography } from "@mui/material";
import {
  VirtoBuild,
  VirtoData,
  VirtoFleet,
  VirtoID,
  VirtoModel,
  VirtoResult,
  VirtoScene,
  VirtoTest,
  VirtoVehicle
} from "../SvgIcons";

import PropTypes from "prop-types";
import React from "react";
import VirtoLogo from "../SvgIcons/VirtoLogo";

// AppLauncher component for app which displays logo, list of items and app version
function AppLauncher({
  logoLinkUrl = null,
  onAppButtonClick = () => {},
  showLogo = true,
  url = "http://localhost:3000"
}) {
  // styles for virto app icons
  const iconStyle = { height: 74, mb: 1, width: 74 };

  // VIRTO app list
  const appList = [
    {
      icon: <VirtoBuild sx={iconStyle} />,
      name: "VIRTO.BUILD",
      url: `${url}/fleet/build`
    },
    {
      icon: <VirtoFleet sx={iconStyle} />,
      name: "VIRTO.FLEET",
      url: `${url}/fleet`
    },
    {
      icon: <VirtoModel sx={iconStyle} />,
      name: "VIRTO.MODEL",
      url: `${url}/model`
    },
    {
      icon: <VirtoScene sx={iconStyle} />,
      name: "VIRTO.SCENE",
      url: `${url}/scene`
    },
    {
      icon: <VirtoTest sx={iconStyle} />,
      name: "VIRTO.TEST",
      url: `${url}/test`
    },
    {
      icon: <VirtoResult sx={iconStyle} />,
      name: "VIRTO.RESULT",
      url: `${url}/result`
    },
    {
      icon: <VirtoData sx={iconStyle} />,
      name: "VIRTO.DATA",
      url: `${url}/data`
    },
    {
      icon: <VirtoVehicle sx={iconStyle} />,
      name: "VIRTO.VEHICLE",
      url: `${url}/vehicle`
    },
    {
      icon: <VirtoID sx={iconStyle} />,
      name: "VIRTO.ID",
      url: `${url}/id`
    }
  ];

  // handle app button click event
  const handleAppButtonClick = cb => event => {
    cb(event);
  };

  // header logo
  const logoBox = (
    <>
      <Box display="flex" justifyContent="center">
        <VirtoLogo
          sx={{
            color: theme =>
              theme.palette.mode === "dark"
                ? "white"
                : theme.palette.primary.main,
            height: 40,
            width: 160
          }}
        />
      </Box>
      <Divider sx={{ margin: theme => theme.spacing(3, 0, 1.5, 0) }} />
    </>
  );

  return (
    <Box px={2} py={3}>
      {showLogo ? (
        <>
          {logoLinkUrl ? (
            <Link
              data-testid="virto-logo"
              href={logoLinkUrl}
              underline="none"
              sx={{
                color: "red"
              }}
            >
              {logoBox}
            </Link>
          ) : (
            logoBox
          )}
        </>
      ) : null}
      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        {appList.map(app => {
          return (
            <Paper
              elevation={1}
              onClick={handleAppButtonClick(onAppButtonClick)}
              key={app.name}
              component="a"
              href={app.url}
              target="_blank"
              data-testid={app.name}
              sx={theme => ({
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? theme.palette.action.hover
                      : "white",
                  boxShadow: theme.shadows[2]
                },
                background: "transparent",
                boxShadow: "none",
                cursor: "pointer",
                mb: 2,
                textDecoration: "none",
                width: 120
              })}
            >
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  px: 2,
                  py: 1.5
                }}
              >
                {app.icon}
                <Typography color="textPrimary" variant="subtitle2">
                  {app.name}
                </Typography>
              </Box>
            </Paper>
          );
        })}
      </Box>
      <Box flexGrow={1} />
    </Box>
  );
}

AppLauncher.propTypes = {
  /**
   * A String of the href URL for the Link of the IPG Logo, default is null (link disabled)
   */
  logoLinkUrl: PropTypes.string,
  /**
   * Callback fired when the user clicks on App Button.
   *
   * **Signature**
   * ```
   * function(event: object) => void
   * ```
   * _event_: The event source of the callback.
   */
  onAppButtonClick: PropTypes.func.isRequired,
  /**
   * Boolean to determine if logo should be displayed at the top of the AppLauncher
   */
  showLogo: PropTypes.bool,
  /**
   *  Base URL for VIRTO home page. All apps are served relative to this URL.
   * @default 'http://localhost:3000'
   * @type {string}
   */
  url: PropTypes.string
};

export default AppLauncher;
