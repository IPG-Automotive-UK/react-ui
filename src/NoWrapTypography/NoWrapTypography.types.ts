import { SxProps, Theme } from "@mui/material/styles";

import { TypographyProps } from "@mui/material";

export interface NoWrapTypographyProps {
  /**
   * The content of the component.
   */
  children: React.ReactNode;
  /**
   * The CSS styles applied to the component.
   */
  // define react type for sx
  sx?: SxProps<Theme>;
  /**
   * The variant to use.
   */
  variant?: TypographyProps["variant"];
}
