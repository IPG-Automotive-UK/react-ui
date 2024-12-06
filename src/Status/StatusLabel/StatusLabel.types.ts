import { CSSProperties } from "react";
import { Status } from "../statuses.types";
import { TypographyProps } from "@mui/material";

export type StatusLabelProps = {
  /**
   *
   * The status type.
   */
  status: Status;
  /**
   * The Variant type.
   */
  variant?:
    | "body1"
    | "body2"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "inherit"
    | "subtitle1"
    | "subtitle2";
  /**
   * The gap between icon and label
   */
  gap?: any;
  /**
   * The color of the text
   */
  color?: TypographyProps["color"];
  iconProps?: {
    /**
     * Icon height
     */
    height?: CSSProperties["height"];
    /**
     * Icon width
     */
    width?: CSSProperties["width"];
    /**
     * Icon padding
     */
    padding?: CSSProperties["padding"];
  };
};
