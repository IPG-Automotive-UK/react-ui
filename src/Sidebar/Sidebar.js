import { Box, Divider, Typography, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

// custom styling
const useStyles = makeStyles(theme => ({
  appVersion: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(2)
  },
  icon: {
    height: 24,
    marginRight: theme.spacing(3),
    width: 30
  },
  logoContainer: {
    ...theme.mixins.toolbar,
    alignItems: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    padding: theme.spacing(0, 2)
  },
  topDivider: {
    margin: theme.spacing(0, 0, 1, 0)
  }
}));

// sidebar component for app which displays logo, list of items and app version
function Sidebar({ logoSrc, children, appVersion }) {
  // use styles
  const classes = useStyles();

  // define components
  return (
    <>
      <Box className={classes.logoContainer}>
        {logoSrc && <img src={logoSrc} className={classes.icon} />}
        <Typography>IPG Automotive</Typography>
      </Box>
      <Divider className={classes.topDivider} />
      {children}
      <Box flexGrow={1} />
      {appVersion && (
        <Typography className={classes.appVersion}>{appVersion}</Typography>
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
