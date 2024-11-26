import { Box, Link, Typography, useTheme } from "@mui/material";
import React, { Fragment } from "react";

import IpgLogo from "../SvgIcons/IpgLogo";
import { SidebarProps } from "./Sidebar.types";

// sidebar component for app which displays logo, list of items and app version
function Sidebar({
  appVersion,
  children,
  showLogo = true,
  showVersion = true
}: SidebarProps) {
  // theme hook
  const theme = useTheme();
  return (
    <Fragment>
      {children}
      <Box
        sx={{
          flexGrow: 1
        }}
      />
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          p: theme => theme.spacing(2)
        }}
      >
        {showLogo ? (
          <Link
            href={"https://ipg-automotive.com"}
            underline="none"
            target="_blank"
            sx={{
              display: "flex"
            }}
          >
            <IpgLogo
              textColour={theme.palette.mode === "light" ? "black" : "white"}
              sx={{ height: 40, width: 120 }}
            />
          </Link>
        ) : null}
        {showVersion ? (
          <Typography sx={{ color: theme => theme.palette.text.primary }}>
            {appVersion}
          </Typography>
        ) : null}
      </Box>
    </Fragment>
  );
}

export default Sidebar;
