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
    | "cancelled"
    | "completed"
    | "failed"
    | "no-metrics"
    | "not-ready"
    | "not-run"
    | "passed"
    | "pending"
    | "ready"
    | "running"
    | "submitted";
};
