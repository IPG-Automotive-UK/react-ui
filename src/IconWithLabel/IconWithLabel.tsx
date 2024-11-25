import { Box, Link, Stack, alpha, useTheme } from "@mui/material";
import React, { cloneElement } from "react";

import { IconWithLabelProps } from "./IconWithLabel.types";
import { NoWrapTypography } from "../index";

/**
 * A component to display an image with a label to the right
 * @param icon The icon to be displayed
 * @param label The label to render alongside the icon
 * @param href When defined the label is a clickable link to this url
 */
export default function IconWithLabel({
  icon,
  label,
  href
}: IconWithLabelProps) {
  const theme = useTheme();
  const iconProps = {
    sx: {
      color: alpha(theme.palette.action.active, 0.54),
      height: "20px",
      width: "20px"
    }
  };
  const customizedIcon = cloneElement(icon, iconProps);

  const LabelComponent = ({ label: string }) => (
    <NoWrapTypography
      variant="caption"
      sx={{
        color: alpha(theme.palette.text.secondary, 0.6),
        fontWeight: 400
      }}
    >
      {label}
    </NoWrapTypography>
  );
  return (
    <Stack data-testid={"icon-with-label"} direction={"row"} gap={"4px"}>
      <Box display={"flex"}>{customizedIcon}</Box>
      {href ? (
        <Link href={href}>
          <LabelComponent label={label} />
        </Link>
      ) : (
        <LabelComponent label={label} />
      )}
    </Stack>
  );
}
