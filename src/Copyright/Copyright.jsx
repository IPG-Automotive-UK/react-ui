import { Link, Typography } from "@mui/material/index.js";

import React from "react";

/**
 * Displays up to date copyright text for IPG Automotive
 */
export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        target="_blank"
        rel="noopener noreferrer"
        href="https://ipg-automotive.com/"
      >
        IPG Automotive
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
