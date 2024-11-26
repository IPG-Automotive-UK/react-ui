import { FormatVersionLabelProps } from "./FormatVersionLabel.types";
import { IconWithLabel } from "../IconWithLabel";
import NumbersOutlinedIcon from "@mui/icons-material/NumbersOutlined";
import React from "react";

export default function FormatVersionLabel({ label }: FormatVersionLabelProps) {
  return IconWithLabel({
    icon: (
      <NumbersOutlinedIcon
        data-testid="format-version-icon"
        sx={{ height: 20, width: 20 }}
      />
    ),
    label
  });
}
