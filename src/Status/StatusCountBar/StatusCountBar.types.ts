import { Status } from "../statuses.types";

export type StatusCountBarProps = {
  /**
   * The status bar title.
   */
  title: string;
  /**
   * The status count object of different statuses.
   */
  count: Record<Status, number>;
};
