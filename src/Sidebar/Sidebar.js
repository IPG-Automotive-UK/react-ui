import { Box, Link, Typography } from "@mui/material";

import IpgLogo from "../SvgIcons/IpgLogo";
import PropTypes from "prop-types";
import React from "react";

// sidebar component for app which displays logo, list of items and app version
function Sidebar({
  appVersion,
  children,
  showLogo = true,
  showVersion = true
}) {
  // use theme

  return (
    <>
      {children}
      <Box flexGrow={1} />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={theme => theme.spacing(2)}
      >
        {showLogo ? (
          <Link href={"https://ipg-automotive.com"} underline="none">
            <IpgLogo sx={{ height: 40, width: 120 }} />
          </Link>
        ) : null}
        {showVersion ? (
          <Typography color={theme => theme.palette.text.primary}>
            {appVersion}
          </Typography>
        ) : null}
      </Box>
    </>
  );
}

Sidebar.propTypes = {
  /**
   * App version to display at base of sidebar.
   */
  appVersion: PropTypes.string,
  /**
   * The content of the component. Recommended children are SidebarItem and SidebarDivider, but any valid react element can be used.
   */
  children: PropTypes.node,
  /**
   * Boolean to determine if logo should be displayed at the bottom of the sidebar
   */
  showLogo: PropTypes.bool,
  /**
   * Boolean to determine if version should be displayed at the bottom of the sidebar
   */
  showVersion: PropTypes.bool
};

export default Sidebar;
