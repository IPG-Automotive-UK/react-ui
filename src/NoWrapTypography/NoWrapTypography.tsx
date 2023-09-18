import React, { useState } from "react";
import { Tooltip, Typography } from "@mui/material";

import { NoWrapTypographyProps } from "./NoWrapTypography.types";

/**
 * Typography component to show a tooltip if the text overflows.
 */
export default function NoWrapTypography({
  children,
  sx,
  variant
}: NoWrapTypographyProps) {
  const [tooltipEnabled, setTooltipEnabled] = useState(false);

  // if the text overflows its bounding box, then show the tooltip
  const handleShouldShow = ({
    currentTarget
  }: React.MouseEvent<HTMLDivElement | null>) => {
    if (currentTarget.scrollWidth > currentTarget.clientWidth) {
      setTooltipEnabled(true);
    }
  };

  // on mouse leave, hide the tooltip
  const hideTooltip = () => setTooltipEnabled(true);

  return (
    <Tooltip
      title={children}
      disableHoverListener={!tooltipEnabled}
      onMouseEnter={handleShouldShow}
      onMouseLeave={hideTooltip}
    >
      <Typography
        noWrap
        component="p" // forces a block element
        sx={{
          ...sx,
          hyphens: "auto",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          wordBreak: "break-all"
        }}
        variant={variant}
      >
        {children}
      </Typography>
    </Tooltip>
  );
}
