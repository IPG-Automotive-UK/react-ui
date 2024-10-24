import * as React from "react";

import { StatusIconProps } from "./StatusIcon.types";
import { Tooltip } from "@mui/material/index.js";
import statuses from "../statuses.js";

/**
 * Displays a status icon.
 */
export default function StatusIcon({
  status,
  width = 40,
  height = 40,
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
          padding: "2px",
          width
        }}
      />
    </Tooltip>
  );
}
