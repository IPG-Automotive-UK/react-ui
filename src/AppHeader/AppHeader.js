import { AppBar, Box, Toolbar, Typography } from "@mui/material";

import PropTypes from "prop-types";
import React from "react";

// app header component
function AppHeader({ children, logoUrl = null, title }) {
  return (
    <AppBar>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h6" color="#fff">
            {title}
          </Typography>
        </Box>
        {children}
      </Toolbar>
    </AppBar>
  );
}

AppHeader.propTypes = {
  /**
   * The content of the component. Recommended children are SidebarItem and SidebarDivider, but any valid react element can be used.
   */
  children: PropTypes.node,
  /**
   * A String of the href URL for the Link of the IPG Logo, default is null (link disabled)
   */
  logoUrl: PropTypes.string,
  /**
   * A String of the href URL for the Link of the IPG Logo, default is null (link disabled)
   */
  title: PropTypes.string
};

export default AppHeader;
