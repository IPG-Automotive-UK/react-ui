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
    | "Passed"
    | "Failed"
    | "Not Run"
    | "Pending"
    | "cancelled"
    | "completed"
    | "failed"
    | "not-ready"
    | "ready"
    | "running"
    | "submitted";
}
