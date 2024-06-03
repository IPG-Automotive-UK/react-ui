import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
  breadcrumbsClasses
} from "@mui/material";

import { BreadcrumbsProps } from "./Breadcrumbs.types";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import React from "react";

/**
 * Breadcrumbs component
 */
function Breadcrumbs({
  breadcrumbs,
  children,
  component = Link
}: BreadcrumbsProps) {
  return (
    <MuiBreadcrumbs
      aria-label="breadcrumbs"
      separator={<NavigateNextIcon fontSize="small" />}
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
      {
        // render children or breadcrumbs
        children ||
          breadcrumbs?.map(({ to, label }, i) =>
            i === breadcrumbs.length - 1 ? (
              <Typography key={label}>{label}</Typography>
            ) : (
              <Link
                component={component}
                key={label}
                href={to}
                underline="hover"
              >
                {label}
              </Link>
            )
          )
      }
    </MuiBreadcrumbs>
  );
}

export default Breadcrumbs;
