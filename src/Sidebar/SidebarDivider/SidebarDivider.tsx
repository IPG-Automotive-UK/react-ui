import { Divider } from "@mui/material";
import React from "react";

/**
 * Divider with specific spacing for usage within Sidebar
 */
export default function SidebarDivider() {
  return (
    <Divider
      sx={theme => ({
        margin: theme.spacing(1, 0)
      })}
    />
  );
}
