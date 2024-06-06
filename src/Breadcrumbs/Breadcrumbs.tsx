import {
  Breadcrumbs as MuiBreadcrumbs,
  breadcrumbsClasses
} from "@mui/material";
import React, { Children, isValidElement } from "react";

import { BreadcrumbsProps } from "./Breadcrumbs.types";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import TruncatedTooltip from "../TruncatedTooltip/TruncatedTooltip";

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
        [`& .${breadcrumbsClasses.ol}`]: {
          flexWrap: "nowrap",
          whiteSpace: "nowrap"
        },
        [`& .${breadcrumbsClasses.li}`]: {
          "& *": {
            color: "text.secondary",
            textDecoration: "none"
          },
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
    >
      {children
        ? Children.map(children, child =>
            child && isValidElement(child) ? (
              <TruncatedTooltip>{child}</TruncatedTooltip>
            ) : null
          )
        : null}
    </MuiBreadcrumbs>
  );
}

export default Breadcrumbs;
