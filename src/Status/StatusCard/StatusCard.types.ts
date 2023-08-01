export interface StatusCardProps {
  /**
   * The status type.
   */
  status: "Passed" | "Failed" | "Pending" | "Not Run";
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

export interface StatusIconProps extends Omit<StatusCardProps, "name"> {}
