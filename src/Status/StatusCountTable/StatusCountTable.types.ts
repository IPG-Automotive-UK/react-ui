import { Status } from "../statuses.types";

export type StatusCount = Partial<Record<Status, number>>;

export type StatusCountTableProps = {
  /**
   * Title of the table
   */
  title: string;
  /**
   * Count is an object which contains objects with partial key status name and status count
   */
  count: StatusCount;
};
