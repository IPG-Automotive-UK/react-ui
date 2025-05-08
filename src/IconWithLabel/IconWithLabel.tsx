import { Box, Link, Stack, Theme, Tooltip, Typography } from "@mui/material";
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
  tooltip = undefined
}: IconWithLabelProps) {
  const iconProps = {
    sx: (theme: Theme) => ({
      color: `color-mix(in srgb, ${theme.vars.palette.action.active} 54%, transparent)`,
      height: "20px",
      width: "20px"
    })
  };
  const customizedIcon = cloneElement(icon, iconProps);

  // define icon with wrapper
  const wrapperIcon = <Box sx={{ display: "flex" }}>{customizedIcon}</Box>;

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
      {tooltip ? (
        <Tooltip data-testid="icon-tooltip" title={tooltip}>
          {wrapperIcon}
        </Tooltip>
      ) : (
        wrapperIcon
      )}
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
                color: theme.vars.palette.primary.main
              }
            })}
          >
            <Typography
              noWrap
              component="p"
              variant="caption"
              sx={theme => ({
                color: theme.vars.palette.primary.main,
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
              color: theme.vars.palette.text.secondary,
              ...theme.applyStyles("dark", {
                opacity: 0.8
              }),
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
