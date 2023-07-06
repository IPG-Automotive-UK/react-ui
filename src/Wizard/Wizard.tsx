import * as React from "react";

import { Box, ThemeProvider, Typography } from "@mui/material";
import { WizardProps, WizardThemeOverrideProps } from "./Wizard.types";

/**
 * The Wizard component allows you to create a multi-step form.
 * It handles title and layout.
 */
export default function Wizard({ title, children, maxWidth }: WizardProps) {
  return (
    <ThemeOverride maxWidth={maxWidth}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          px: 3
        }}
      >
        {title ? (
          <Typography
            variant="h5"
            color="textPrimary"
            sx={{
              fontWeight: 700,
              maxWidth: theme => theme?.layout?.content?.maxWidth,
              mb: 3,
              mt: 1,
              mx: "auto",
              width: "100%"
            }}
          >
            {title}
          </Typography>
        ) : null}
        {children}
      </Box>
    </ThemeOverride>
  );
}

/**
 * Internal wrapper for ThemeProvider that overrides the layout.content.maxWidth if maxWidth is provided.
 */
function ThemeOverride({ children, maxWidth }: WizardThemeOverrideProps) {
  return maxWidth ? (
    <ThemeProvider
      theme={baseTheme => ({
        ...baseTheme,
        layout: {
          content: {
            maxWidth
          }
        }
      })}
    >
      {children}
    </ThemeProvider>
  ) : (
    <>{children}</>
  );
}
