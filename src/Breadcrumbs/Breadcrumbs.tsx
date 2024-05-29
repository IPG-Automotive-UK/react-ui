import { Link, Breadcrumbs as MuiBreadcrumbs } from "@mui/material";

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
    >
      {
        // render children or breadcrumbs
        children ||
          breadcrumbs?.map(({ to, label }, i) => (
            <Link
              sx={{
                color:
                  i === breadcrumbs.length - 1
                    ? "text.primary"
                    : "text.secondary"
              }}
              component={component}
              key={label}
              href={to}
              underline="hover"
            >
              {label}
            </Link>
          ))
      }
    </MuiBreadcrumbs>
  );
}

export default Breadcrumbs;
