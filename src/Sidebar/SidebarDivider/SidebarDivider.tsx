import { Divider } from "@mui/material/index.js";
import React from "react";

/**
 * Divider with specific spacing for usage within Sidebar
 */
export default function SidebarDivider() {
  return <Divider sx={{ margin: theme => theme.spacing(1, 0) }} />;
}
