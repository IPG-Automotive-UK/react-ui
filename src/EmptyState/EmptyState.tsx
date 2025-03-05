import { Box, Stack, Theme, Typography } from "@mui/material";

import { EmptyStateProps } from "./EmptyState.types";
import React from "react";

function EmptyState({ title, subtitle, icon, actions }: EmptyStateProps) {
  return (
    <Box
      sx={theme => ({
        alignItems: "center",
        background: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        gap: 2,
        height: "100%",
        justifyContent: "center",
        p: 2
      })}
    >
      {icon && (
        <Box
          sx={{
            alignItems: "center",
            backgroundColor: (theme: Theme) => theme.palette.action.hover,
            borderRadius: 300,
            display: "flex",
            gap: "10px",
            height: 180,
            justifyContent: "center",
            width: 180
          }}
        >
          {React.cloneElement(icon, {
            sx: (theme: Theme) => ({
              color: theme.palette.primary.main,
              height: 100,
              width: 100,
              ...(icon.props.sx || {})
            })
          })}
        </Box>
      )}
      <Stack sx={{ alignItems: "center", gap: 1, mb: 1, mt: icon ? 4 : 0 }}>
        {title && (
          <Typography
            variant="h6"
            sx={{
              color: theme => theme.palette.text.primary,
              fontWeight: 700
            }}
          >
            {title}
          </Typography>
        )}

        {subtitle && (
          <Typography
            variant="body2"
            sx={{
              color: theme => theme.palette.text.secondary,
              fontSize: "16px"
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Stack>

      {actions && actions.length > 0 && (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {actions.map((action, index) =>
            React.cloneElement(action, { key: index })
          )}
        </Stack>
      )}
    </Box>
  );
}

export default EmptyState;
