import { CSSProperties } from "react";

export interface StatusIconProps {
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
}
