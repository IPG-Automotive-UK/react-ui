import * as React from "react";

import { StatusIconProps } from "./StatusIcon.types";
import { Tooltip } from "@mui/material";
import statuses from "../statuses";

/**
 * Displays a status icon.
 */
export default function StatusIcon({
  status,
  width = 40,
  height = 40,
  padding = "2px",
  iconTooltipText
}: StatusIconProps) {
  const {
    icon: { type: Icon, color }
  } = statuses[status];
  return (
    <Tooltip title={iconTooltipText} placement="bottom">
      <Icon
        sx={{
          color,
          height,
          padding,
          width
        }}
      />
    </Tooltip>
  );
}
