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
  title
}: StatusIconProps) {
  const {
    icon: { type: Icon, color }
  } = statuses[status];
  return (
    <Tooltip title={title} placement="bottom">
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
