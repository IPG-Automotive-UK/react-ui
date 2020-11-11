import React from "react";
import { Typography, Link } from "@material-ui/core";

/**
 * Displays up to date copyright text for IPG Automotive
 */
export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://ipg-automotive.com/">
        IPG Automotive
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
