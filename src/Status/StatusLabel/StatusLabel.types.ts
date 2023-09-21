import { CSSProperties } from "react";
import type { StatusIconProps } from "../StatusIcon";

export type StatusLabelProps = {
  /**
   *
   * The status type.
   */
  status: StatusIconProps["status"];
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
  iconProps?: {
    /**
     * Icon height
     */
    height?: CSSProperties["height"];
    /**
     * Icon width
     */
    width?: CSSProperties["width"];
  };
};
