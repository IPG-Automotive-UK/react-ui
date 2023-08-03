import * as React from "react";

import { StatusIconProps } from "./StatusIcon.types";
import statuses from "../statuses";

/**
 * Displays a status icon.
 */
export default function StatusIcon({
  status,
  width = 40,
  height = 40
}: StatusIconProps) {
  const {
    icon: { type: Icon, color }
  } = statuses[status];
  return (
    <Icon
      sx={{
        color,
        height,
        padding: "2px",
        width
      }}
    />
  );
}
