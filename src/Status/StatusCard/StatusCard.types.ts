export interface StatusCardProps {
  /**
   * The status type.
   */
  status: "passed" | "failed" | "pending" | "not-run";
  /**
   * The status message.
   */
  name: string;
  /**
   * width of the card.
   */
  width?: number;
  /**
   * height of the card.
   */
  height?: number;
}
