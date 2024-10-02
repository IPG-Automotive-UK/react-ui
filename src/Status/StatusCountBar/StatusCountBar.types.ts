import { StatusCount } from "../StatusCountTable";

export type StatusCountBarProps = {
  /**
   * The status bar title.
   */
  title: string;
  /**
   * The status count object of different statuses.
   */
  count: StatusCount;
};
