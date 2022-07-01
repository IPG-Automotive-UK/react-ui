import { Box, Divider, Link, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

// sidebar component for app which displays logo, list of items and app version
function Sidebar({
  appVersion,
  children,
  logoLinkUrl = null,
  logoSrc,
  showLogo = true,
  showVersion = true
}) {
  // define components
  const logoBox = (
    <>
      <Box
        sx={{
          alignItems: "center",
          color: theme => theme.palette.text.secondary,
          display: "flex",
          padding: theme => theme.spacing(2.5)
        }}
      >
        {logoSrc && (
          <Box
            sx={{
              height: 24,
              marginRight: theme => theme.spacing(3),
              width: 30
            }}
          >
            <img src={logoSrc} />
          </Box>
        )}
        <Typography>IPG Automotive</Typography>
      </Box>
    </>
  );

  return (
    <>
      {showLogo ? (
        <>
          {logoLinkUrl ? (
            <Link href={logoLinkUrl} underline="none">
              {logoBox}
            </Link>
          ) : (
            logoBox
          )}
          <Divider sx={{ margin: theme => theme.spacing(0, 0, 1, 0) }} />
        </>
      ) : null}
      {children}
      <Box flexGrow={1} />
      {showVersion ? (
        <Typography
          sx={{
            color: theme => theme.palette.text.secondary,
            padding: theme => theme.spacing(2)
          }}
        >
          {appVersion}
        </Typography>
      ) : null}
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
   * A String of the href URL for the Link of the IPG Logo, default is null (link disabled)
   */
  logoLinkUrl: PropTypes.string,
  /**
   * Image source for logo displayed at top of sidebar
   */
  logoSrc: PropTypes.string,
  /**
   * Boolean to determine if logo should be displayed at the top of the sidebar
   */
  showLogo: PropTypes.bool,
  /**
   * Boolean to determine if version should be displayed at the bottom of the sidebar
   */
  showVersion: PropTypes.bool
};

export default Sidebar;
