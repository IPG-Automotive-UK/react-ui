import * as React from "react";

import { Box, ThemeProvider, Typography } from "@mui/material";

import PropTypes from "prop-types";

/**
 * The Wizard component allows you to create a multi-step form.
 * It handles title and layout.
 */
export default function Wizard({ title, children, maxWidth }) {
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
function ThemeOverride({ children, maxWidth }) {
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
    children
  );
}

// prop types
Wizard.propTypes = {
  /**
   * Children. Should be WizardSteps, WizardContent, and WizardActions components in that order.
   */
  children: PropTypes.node,
  /**
   * Maximum width of the content. This includes the title, steps, and content, but not the actions. Default is taken from the parent theme (layout.content.maxWidth).
   */
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Wizard title
   */
  title: PropTypes.string
};

ThemeOverride.propTypes = {
  /**
   * Children.
   */
  children: PropTypes.node,
  /**
   * Maximum width to override in the theme.
   */
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
