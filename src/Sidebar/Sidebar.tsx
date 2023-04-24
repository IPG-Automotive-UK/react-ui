import { Box, Link, Typography } from "@mui/material";
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
  return (
    <Fragment>
      {children}
      <Box flexGrow={1} />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={theme => theme.spacing(2)}
      >
        {showLogo ? (
          <Link
            href={"https://ipg-automotive.com"}
            underline="none"
            display="flex"
            target="_blank"
          >
            <IpgLogo sx={{ height: 40, width: 120 }} />
          </Link>
        ) : null}
        {showVersion ? (
          <Typography color={theme => theme.palette.text.primary}>
            {appVersion}
          </Typography>
        ) : null}
      </Box>
    </Fragment>
  );
}

export default Sidebar;
