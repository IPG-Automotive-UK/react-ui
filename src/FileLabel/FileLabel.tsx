import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { FileLabelProps } from "./FileLabel.types";
import { IconWithLabel } from "../IconWithLabel";
import React from "react";

/**
 * Component that renders a file icon and the filename to the right
 * @param label The name of the file to be displayed
 */
export default function FileLabel({ label }: FileLabelProps) {
  return IconWithLabel({
    icon: (
      <AttachFileOutlinedIcon
        data-testid="file-icon"
        sx={{ height: 20, width: 20 }}
      />
    ),
    label
  });
}
