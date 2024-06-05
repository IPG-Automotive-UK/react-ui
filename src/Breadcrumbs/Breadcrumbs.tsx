import {
  Breadcrumbs as MuiBreadcrumbs,
  breadcrumbsClasses
} from "@mui/material";

import { BreadcrumbsProps } from "./Breadcrumbs.types";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import React from "react";

/**
 * Breadcrumbs component
 */
function Breadcrumbs({ children, ...rest }: BreadcrumbsProps) {
  return (
    <MuiBreadcrumbs
      {...rest}
      aria-label="breadcrumbs"
      separator={<NavigateNextIcon fontSize="small" />}
      // style overrides to style children
      sx={{
        [`& .${breadcrumbsClasses.li} *`]: {
          color: "text.secondary",
          textDecoration: "none"
        },
        [`& .${breadcrumbsClasses.li}:last-child *`]: {
          color: "text.primary",
          textDecoration: "none"
        },
        [`& .${breadcrumbsClasses.li}:not(:last-child):hover *`]: {
          textDecoration: "underline"
        }
      }}
    >
      {children}
    </MuiBreadcrumbs>
  );
}

export default Breadcrumbs;
