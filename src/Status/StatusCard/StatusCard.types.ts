export type StatusCardProps = {
  /**
   * The status type.
   */
  status: "passed" | "failed" | "pending" | "not-run";
  /**
   * The status message.
   */
  name: string;
};
