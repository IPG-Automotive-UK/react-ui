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
  baseUrl = "http://localhost:3000",
  logoLinkUrl = null,
  onAppButtonClick = () => {},
  showLogo = true
}) {
  // styles for virto app icons
  const iconStyle = { height: 74, mb: 1, width: 74 };

  // VIRTO app list
  const appList = [
    {
      icon: <VirtoBuild sx={iconStyle} />,
      name: "VIRTO.BUILD",
      url: `${baseUrl}/fleet/build`
    },
    {
      icon: <VirtoFleet sx={iconStyle} />,
      name: "VIRTO.FLEET",
      url: `${baseUrl}/fleet`
    },
    {
      icon: <VirtoModel sx={iconStyle} />,
      name: "VIRTO.MODEL",
      url: `${baseUrl}/model`
    },
    {
      icon: <VirtoScene sx={iconStyle} />,
      name: "VIRTO.SCENE",
      url: `${baseUrl}/scene`
    },
    {
      icon: <VirtoTest sx={iconStyle} />,
      name: "VIRTO.TEST",
      url: `${baseUrl}/test`
    },
    {
      icon: <VirtoResult sx={iconStyle} />,
      name: "VIRTO.RESULT",
      url: `${baseUrl}/result`
    },
    {
      icon: <VirtoData sx={iconStyle} />,
      name: "VIRTO.DATA",
      url: `${baseUrl}/data`
    },
    {
      icon: <VirtoVehicle sx={iconStyle} />,
      name: "VIRTO.VEHICLE",
      url: `${baseUrl}/vehicle`
    },
    {
      icon: <VirtoID sx={iconStyle} />,
      name: "VIRTO.ID",
      url: `${baseUrl}/id`
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
   * Base URL for VIRTO home page. All apps are served relative to this URL.
   * @default 'http://localhost:3000'
   * @type {string}
   */
  baseUrl: PropTypes.string,
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
  showLogo: PropTypes.bool
};

export default AppLauncher;
