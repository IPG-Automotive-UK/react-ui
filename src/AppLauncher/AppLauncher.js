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
function AppLauncher({ logoLinkUrl = null, showLogo = true, appUrls }) {
  // styles for virto app icons
  const iconStyle = { height: 75, mb: 1, width: 75 };

  // VIRTO app list
  const appList = [
    {
      icon: <VirtoBuild sx={iconStyle} />,
      name: "VIRTO.BUILD"
    },
    {
      icon: <VirtoFleet sx={iconStyle} />,
      name: "VIRTO.FLEET"
    },
    {
      icon: <VirtoModel sx={iconStyle} />,
      name: "VIRTO.MODEL"
    },
    {
      icon: <VirtoScene sx={iconStyle} />,
      name: "VIRTO.SCENE"
    },
    {
      icon: <VirtoTest sx={iconStyle} />,
      name: "VIRTO.TEST"
    },
    {
      icon: <VirtoResult sx={iconStyle} />,
      name: "VIRTO.RESULT"
    },
    {
      icon: <VirtoData sx={iconStyle} />,
      name: "VIRTO.DATA"
    },
    {
      icon: <VirtoVehicle sx={iconStyle} />,
      name: "VIRTO.VEHICLE"
    },
    {
      icon: <VirtoID sx={iconStyle} />,
      name: "VIRTO.ID"
    }
  ];

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
              key={app.name}
              component="a"
              href={appUrls?.length > 0 ? appUrls[0][app.name] : "#"}
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
                opacity:
                  appUrls?.length > 0 && appUrls[0][app.name] !== undefined
                    ? 1
                    : 0.5,
                pointerEvents:
                  appUrls?.length > 0 && appUrls[0][app.name] !== undefined
                    ? "auto"
                    : "none",
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
   * A String of the href URL for the Link of the IPG Logo, default is null (link disabled)
   */
  logoLinkUrl: PropTypes.string,
  /**
   * Boolean to determine if logo should be displayed at the top of the AppLauncher
   */
  showLogo: PropTypes.bool
};

export default AppLauncher;
