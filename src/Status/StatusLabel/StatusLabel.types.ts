import { CSSProperties } from "react";
import { Status } from "../statuses.types";

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
