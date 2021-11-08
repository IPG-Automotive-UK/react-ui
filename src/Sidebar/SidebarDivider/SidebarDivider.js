import { Divider } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React from "react";

// styling
const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1, 0)
  }
}));

/**
 * Divider with specific spacing for usage within Sidebar
 */
export default function SidebarDivider() {
  const classes = useStyles();
  return <Divider classes={classes} />;
}
