export type StatusCardProps = {
  /**
   * The status type.
   */
  status: "passed" | "failed" | "pending" | "not-run" | "no-metrics";
  /**
   * The status message.
   */
  name: string;
};
