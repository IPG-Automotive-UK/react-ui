import { Box, SxProps } from "@mui/material";

import { Decorator } from "@storybook/react";
import React from "react";
import ThemeProvider from "../src/ThemeProvider/ThemeProvider";
import { useDarkMode } from "storybook-dark-mode";

/**
 * Story decorator to help bound the component to the Storybook UI otherwise the fixed positioning of the AppHeader can render outside of the bounds of where the story is rendering
 */
const fixedPositionComponentDecorator: (sx: SxProps) => Decorator =
  sx => storyFcn => (
    <Box
      sx={[
        {
          transform: "scale(1)"
        },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
    >
      {storyFcn()}
    </Box>
  );

/**
 * Story decorator for light/dark mode using the ThemeProvider
 */
const themeProviderDecorator: Decorator = renderStory => {
  const isDark = useDarkMode();
  return (
    <ThemeProvider theme={isDark ? "dark" : "light"}>
      {renderStory()}
    </ThemeProvider>
  );
};

export { fixedPositionComponentDecorator, themeProviderDecorator };
