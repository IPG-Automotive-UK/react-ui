import { SvgIconProps } from "@mui/material/SvgIcon";

export interface IpgLogoProps {
  /**
   * An overide for the theme.palette.mode of the component either light or dark
   */
  mode?: "light" | "dark";
  /**
   * SVG icon props to be passed to the icon
   */
  sx?: SvgIconProps["sx"];
}
