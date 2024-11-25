import { Box, Link, Stack, Typography, alpha, useTheme } from "@mui/material";
import React, { cloneElement } from "react";

import { IconWithLabelProps } from "./IconWithLabel.types";

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

  return (
    <Stack
      data-testid={"icon-with-label"}
      direction={"row"}
      gap={"4px"}
      display={"flex"}
    >
      <Box display={"flex"}>{customizedIcon}</Box>
      <Box minWidth={0}>
        {href ? (
          <Link
            href={href}
            underline="hover"
            sx={theme => ({
              "&:hover": {
                color: theme.palette.primary.main
              }
            })}
          >
            <Typography
              noWrap
              component={"p"}
              variant="caption"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 400
              }}
            >
              {label}
            </Typography>
          </Link>
        ) : (
          <Typography
            noWrap
            component={"p"}
            variant="caption"
            sx={{
              color: alpha(theme.palette.text.secondary, 0.6),
              fontWeight: 400
            }}
          >
            {label}
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
