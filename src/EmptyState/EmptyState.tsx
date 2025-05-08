import { Box, Stack, Theme, Typography, useColorScheme } from "@mui/material";

import { EmptyStateProps } from "./EmptyState.types";
import React from "react";

/**
 * EmptyState Component
 * Displays a customizable empty state UI with optional icon, title, subtitle, and action buttons
 * Used when there's no data to display or to guide users to take action
 * @param {string} title - Main heading text
 * @param {string} subtitle - Secondary descriptive text
 * @param {React.ReactElement} icon - Icon element
 * @param {React.ReactElement[]} actions - Array of action elements (typically buttons)
 */
function EmptyState({ title, subtitle, icon, actions }: EmptyStateProps) {
  // get theme mode
  const { mode } = useColorScheme();
  return (
    <Box
      sx={theme => ({
        alignItems: "center",
        background: theme.vars.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        gap: 2,
        height: "100%",
        justifyContent: "center",
        p: 2
      })}
    >
      {icon ? (
        <Box
          sx={theme => ({
            alignItems: "center",
            backgroundColor: `color-mix(in srgb, ${theme.vars.palette.primary.main} 4%, transparent)`,
            ...theme.applyStyles("dark", {
              backgroundColor: `color-mix(in srgb, ${theme.vars.palette.primary.main} 8%, transparent)`
            }),
            borderRadius: 300,
            display: "flex",
            gap: 2,
            height: 180,
            justifyContent: "center",
            width: 180
          })}
        >
          {React.cloneElement(icon, {
            sx: (theme: Theme) => ({
              color: theme.vars.palette.primary.main,
              height: 100,
              width: 100,
              ...(icon.props.sx || {})
            })
          })}
        </Box>
      ) : null}
      <Stack
        sx={{
          gap: 1,
          textAlign: "center"
        }}
      >
        {title ? (
          <Typography
            variant="h6"
            sx={{
              color: theme => theme.vars.palette.text.primary,
              fontWeight: 700
            }}
          >
            {title}
          </Typography>
        ) : null}

        {subtitle ? (
          <Typography
            variant="body2"
            sx={{
              color: theme => theme.vars.palette.text.secondary,
              fontSize: "16px"
            }}
          >
            {subtitle}
          </Typography>
        ) : null}
      </Stack>
      {actions && actions.length > 0 ? (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {actions.map((action, index) =>
            React.cloneElement(action, {
              key: index,
              sx: (theme: Theme) => ({
                color:
                  mode === "light"
                    ? theme.vars.palette.common.white
                    : theme.vars.palette.common.black
              })
            })
          )}
        </Stack>
      ) : null}
    </Box>
  );
}

export default EmptyState;
