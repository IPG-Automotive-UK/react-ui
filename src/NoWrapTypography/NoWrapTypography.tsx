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
  const [open, setOpen] = useState(false);

  // if the text overflows its bounding box, then show the tooltip
  const handleShouldShow = ({
    currentTarget
  }: React.MouseEvent<HTMLDivElement | null>) => {
    setOpen(currentTarget.scrollWidth > currentTarget.clientWidth);
  };

  // on mouse leave, hide the tooltip
  const hideTooltip = () => setOpen(false);

  return (
    <Tooltip
      title={children}
      open={open}
      onMouseEnter={handleShouldShow}
      onMouseLeave={hideTooltip}
    >
      <Typography
        noWrap
        component="p" // forces a block element
        sx={[
          {
            hyphens: "auto",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            wordBreak: "break-all"
          },
          // You cannot spread `sx` directly because `SxProps` (typeof sx) can be an array.
          ...(Array.isArray(sx) ? sx : [sx])
        ]}
        variant={variant}
      >
        {children}
      </Typography>
    </Tooltip>
  );
}
