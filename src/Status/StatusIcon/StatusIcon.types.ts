export interface StatusIconProps {
  /**
   * Icon height
   */
  height?: number;
  /**
   * Icon width
   */
  width?: number;
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
