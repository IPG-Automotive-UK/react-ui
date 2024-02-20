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
};
