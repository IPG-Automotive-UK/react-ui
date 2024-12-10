import { IconWithLabel } from "../IconWithLabel";
import LayersIcon from "@mui/icons-material/Layers";
import React from "react";
import { VersionLabelProps } from "./VersionLabel.types";

/**
 * Component that renders version icon and version to the right of it
 * @param label The version number in string format
 */
export default function VersionLabel({ label }: VersionLabelProps) {
  return IconWithLabel({
    icon: (
      <LayersIcon data-testid="version-icon" sx={{ height: 20, width: 20 }} />
    ),
    label
  });
}
