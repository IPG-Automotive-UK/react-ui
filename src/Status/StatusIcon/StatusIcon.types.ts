import { CSSProperties } from "react";

export type StatusIconProps = {
  /**
   * Icon height
   */
  height?: CSSProperties["height"];
  /**
   * Icon width
   */
  width?: CSSProperties["width"];
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
};
