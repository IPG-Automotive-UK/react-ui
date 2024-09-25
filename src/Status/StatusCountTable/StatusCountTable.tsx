import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";

import React from "react";
import { Status } from "../statuses.types";
import { StatusCountTableProps } from "./StatusCountTable.types";
import StatusIcon from "../StatusIcon";

// custom status count table component, which will be used in the status bar component on hover to show aditional data about statuses
export function StatusCountTable({
  title,
  count,
  tableSx = { borderRadius: "4px", boxShadow: 8, maxWidth: "280px" }
}: StatusCountTableProps) {
  const totalCount = Object.values(count).reduce((a, b) => a + b, 0);

  /** Render every status name with first letter Capital and replace dashes with empty space */
  function capitalizeFirstLetterAndRemoveDashes(str: string): string {
    // Handle empty string case
    if (!str) return str;
    // Capitalize the first letter of a status
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    // replace dashes with empty space
    if (capitalized.includes("-")) {
      return capitalized.replace("-", " ");
    }
    return capitalized;
  }

  return (
    <TableContainer sx={tableSx}>
      <Table size="small">
        <TableHead>
          <TableRow
            sx={{
              background: theme => theme.palette.background.default,
              height: "41px"
            }}
          >
            <TableCell style={{ paddingLeft: "16px" }}>
              <Typography variant="subtitle2" data-testid="status-count-title">
                {title}
              </Typography>
            </TableCell>
            <TableCell align="right" style={{ paddingRight: "16px" }}>
              <Typography
                variant="subtitle2"
                data-testid="status-count-total-count"
              >
                {totalCount}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(count)
            .reverse()
            .map(row => (
              <TableRow
                key={row}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  style={{ paddingLeft: "16px" }}
                  component="th"
                  scope="row"
                >
                  <Typography
                    variant="body2"
                    display="flex"
                    alignItems="center"
                    gap="8px"
                  >
                    <StatusIcon status={row as Status} width={24} height={24} />
                    {capitalizeFirstLetterAndRemoveDashes(row)}
                  </Typography>
                </TableCell>
                <TableCell align="right" style={{ paddingRight: "16px" }}>
                  <Typography variant="body2">{count[row]}</Typography>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
