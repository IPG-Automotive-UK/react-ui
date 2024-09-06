import { Status } from "../statuses.types";

export type StatusCardProps = {
  /**
   * The status type.
   */
  status: Status;
  /**
   * The status message.
   */
  name: string;
  /**
   * Tooltip text to display on hover of the icon
   */
  title?: string;
};
