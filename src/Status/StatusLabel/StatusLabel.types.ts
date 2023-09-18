import { CSSProperties } from "react";

export type StatusLabelProps = {
  /**
   *
   * The status type.
   */
  status:
    | "passed"
    | "not-run"
    | "pending"
    | "cancelled"
    | "completed"
    | "failed"
    | "not-ready"
    | "ready"
    | "running"
    | "submitted";
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
