import { Status } from "../statuses.types";

export type StatusCountTableProps = {
  /**
   * Title of the table
   */
  title: string;
  /**
   * Count is an object which contains objects with key status name and status count
   */
  count: Record<Status, number>;
};
