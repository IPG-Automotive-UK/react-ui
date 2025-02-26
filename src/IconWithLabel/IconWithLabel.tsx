import {
  Box,
  Link,
  Stack,
  Theme,
  Tooltip,
  Typography,
  alpha
} from "@mui/material";
import React, { cloneElement } from "react";

import { IconWithLabelProps } from "./IconWithLabel.types";

/**
 * A component to display an image with a label to the right
 * @param icon The icon to be displayed
 * @param label The label to render alongside the icon
 * @param href When defined the label is a clickable link to this url
 * @param tooltip When defined it shows tooltip over the icon
 */
export default function IconWithLabel({
  icon,
  label,
  href,
  tooltip = ""
}: IconWithLabelProps) {
  const iconProps = {
    sx: (theme: Theme) => ({
      color: alpha(theme.palette.action.active, 0.54),
      height: "20px",
      width: "20px"
    })
  };
  const customizedIcon = cloneElement(icon, iconProps);

  return (
    <Stack
      data-testid="icon-with-label"
      direction="row"
      sx={{
        alignItems: "center",
        display: "flex",
        gap: "4px"
      }}
    >
      <Tooltip data-testid="icon-tooltip" title={tooltip}>
        <Box
          sx={{
            display: "flex"
          }}
        >
          {customizedIcon}
        </Box>
      </Tooltip>
      <Box
        sx={{
          minWidth: 0
        }}
      >
        {href ? (
          <Link
            target="_blank"
            rel="noopener noreferrer"
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
              component="p"
              variant="caption"
              sx={theme => ({
                color: theme.palette.primary.main,
                fontWeight: 400
              })}
            >
              {label}
            </Typography>
          </Link>
        ) : (
          <Typography
            noWrap
            component="p"
            variant="caption"
            sx={theme => ({
              color: alpha(theme.palette.text.secondary, 0.6),
              fontWeight: 400
            })}
          >
            {label}
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
