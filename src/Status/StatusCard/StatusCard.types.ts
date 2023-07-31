export interface StatusCardProps {
  /**
   * The status type.
   */
  status:
    | "cancelled"
    | "completed"
    | "failed"
    | "not-ready"
    | "ready"
    | "running"
    | "submitted";
  /**
   * The status message.
   */
  name: string;
}
