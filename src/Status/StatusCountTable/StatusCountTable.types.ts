import { SxProps, Theme } from "@mui/material";

export type StatusCountTableProps = {
  /**
   * Title of the table
   */
  title: string;
  /**
   * Count is an object which contains objects with key status name and status count
   */
  count: { [status: string]: number };
  /**
   * Optional style properties for the table element
   */
  tableSx?: SxProps<Theme>;
};
