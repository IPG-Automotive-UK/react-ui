import { Status } from "../statuses.types";

/* eslint-disable no-unused-vars */
export type StatusCountBarProps = {
  /**
   * The status bar title.
   */
  title: string;
  /**
   * The status count object of different statuses.
   */
  count: { [status in Status]?: number };
  //   count: Record<Status, number>;
};
