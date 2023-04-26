import { SvgIconProps } from "@mui/material/SvgIcon";

export interface IpgLogoProps {
  /**
   * The colour of the text in the logo
   */
  textColour?: "white" | "black";
  /**
   * SVG icon props to be passed to the icon
   */
  sx?: SvgIconProps["sx"];
}
