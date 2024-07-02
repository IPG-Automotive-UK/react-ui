import {
  Breadcrumbs as MuiBreadcrumbs,
  breadcrumbsClasses
} from "@mui/material";
import React, { Children, isValidElement } from "react";

import { BreadcrumbsProps } from "./Breadcrumbs.types";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import TruncatedTooltip from "../TruncatedTooltip/TruncatedTooltip";

/**
 * Breadcrumbs component.
 * Renders components passed as children and wraps
 * them in a truncated tooltip with separators.
 */
function Breadcrumbs({
  children,
  separator = <NavigateNextIcon fontSize="small" />,
  ...rest
}: BreadcrumbsProps) {
  /**
   *  Map children and wrap the final item in a truncated tooltip with separators
   */
  const mappedChildren = Children.map(children, (child, i) =>
    child && isValidElement(child) ? (
      Children.count(children) === i + 1 ? (
        <TruncatedTooltip>{child}</TruncatedTooltip>
      ) : (
        child
      )
    ) : null
  );

  return (
    <MuiBreadcrumbs
      aria-label="breadcrumbs"
      separator={separator}
      // style overrides to style children
      sx={{
        // Ensure that the breadcrumbs do not wrap
        [`& .${breadcrumbsClasses.ol}`]: {
          flexWrap: "nowrap",
          whiteSpace: "nowrap"
        },
        [`& .${breadcrumbsClasses.li}`]: {
          // All breadcrumb children have styled text, decoration and block for overflow
          "& *": {
            color: "text.secondary",
            textDecoration: "none"
            // Ensure children of block level elements are inline for ellipsis rendering
          },
          "&:last-child": {
            flexShrink: 1
          },
          flexShrink: 0,
          overflow: "hidden"
        },
        [`& .${breadcrumbsClasses.li}:last-child *`]: {
          color: "text.primary",
          textDecoration: "none"
        },
        [`& .${breadcrumbsClasses.li}:not(:last-child):hover a`]: {
          textDecoration: "underline"
        }
      }}
      {...rest}
    >
      {children ? mappedChildren : null}
    </MuiBreadcrumbs>
  );
}

export default Breadcrumbs;
