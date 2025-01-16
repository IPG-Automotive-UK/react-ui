import { Box, Divider, Link, Paper, Typography } from "@mui/material";
import React, { Fragment } from "react";
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

import { VirtoLogo } from "../SvgIcons/VirtoLogo";

// AppLauncher component for app which displays logo, list of items and app version
function AppLauncher({
  baseUrl = "http://localhost:3000",
  logoLinkUrl = "",
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
  const handleAppButtonClick =
    (cb: (event: object) => void) => (event: React.MouseEvent<HTMLElement>) => {
      cb(event);
    };

  // header logo
  const logoBox = (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <VirtoLogo
          sx={theme => ({
            color: theme.palette.primary.main,
            height: 40,
            width: 160,
            ...theme.applyStyles("dark", {
              color: theme.palette.common.white
            })
          })}
        />
      </Box>
      <Divider
        sx={theme => ({
          margin: theme.spacing(3, 0, 1.5, 0)
        })}
      />
    </Fragment>
  );

  return (
    <Box
      sx={{
        px: 2,
        py: 3
      }}
    >
      {showLogo ? (
        <Fragment>
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
        </Fragment>
      ) : null}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between"
        }}
      >
        {appList.map(app => {
          return (
            <Paper
              elevation={1}
              onClick={handleAppButtonClick(onAppButtonClick)}
              key={app.name}
              component="a"
              href={app.url}
              target={window.location.href.startsWith(app.url) ? "" : "_blank"}
              data-testid={app.name}
              sx={theme => ({
                "&:hover": {
                  backgroundColor: "white",
                  boxShadow: theme.shadows[2],
                  ...theme.applyStyles("dark", {
                    backgroundColor: theme.palette.action.hover
                  })
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
      <Divider sx={{ mb: 2.5 }} />
      <Box sx={{ textAlign: "center" }}>
        <Link
          data-testid="app-launcher-status-link"
          href={`${baseUrl}/status`}
          variant="body1"
          underline="hover"
          target="_blank"
        >
          VIRTO Status
        </Link>
      </Box>
      <Box
        sx={{
          flexGrow: 1
        }}
      />
    </Box>
  );
}

export default AppLauncher;
