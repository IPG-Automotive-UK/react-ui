import { Box, SxProps } from "@mui/material";

import { DecoratorFn } from "@storybook/react";
import React from "react";

/**
 * Story decorator
 * This helps bound the component to the Storybook UI otherwise the fixed positioning of the AppHeader can render outside of the bounds of where the story is rendering
 */
const fixedPositionComponentDecorator: (sx: SxProps) => DecoratorFn =
  sx => storyFcn =>
    (
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

export { fixedPositionComponentDecorator };
