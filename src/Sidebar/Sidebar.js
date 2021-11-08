import { Box, Divider, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

// sidebar component for app which displays logo, list of items and app version
function Sidebar({ logoSrc, children, appVersion }) {
  // define components
  return (
    <>
      <Box
        sx={{
          alignItems: "center",
          color: theme => theme.palette.text.secondary,
          display: "flex",
          padding: theme => theme.spacing(0, 2)
        }}
      >
        {logoSrc && (
          <img
            src={logoSrc}
            sx={{
              height: 24,
              marginRight: theme => theme.spacing(3),
              width: 30
            }}
          />
        )}
        <Typography>IPG Automotive</Typography>
      </Box>
      <Divider sx={{ margin: theme => theme.spacing(0, 0, 1, 0) }} />
      {children}
      <Box flexGrow={1} />
      {appVersion && (
        <Typography
          sx={{
            color: theme => theme.palette.text.secondary,
            padding: theme => theme.spacing(2)
          }}
        >
          {appVersion}
        </Typography>
      )}
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
   * Image source for logo displayed at top of sidebar
   */
  logoSrc: PropTypes.string
};

export default Sidebar;
