import { NoWrapTypographyProps } from "./NoWrapTypography.types";
import React from "react";
import TruncatedTooltip from "../TruncatedTooltip/index.js";
import { Typography } from "@mui/material/index.js";

/**
 * Typography component to show a tooltip if the text overflows.
 */
export default function NoWrapTypography({
  children,
  sx,
  variant
}: NoWrapTypographyProps) {
  return (
    <TruncatedTooltip component={Typography} variant={variant} sx={sx}>
      {children}
    </TruncatedTooltip>
  );
}
