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
import statuses from "../statuses";

/**
 * Table that renders statuses vs. the number of items that match that status. Header row shows the total count alongside a title.
 */
export function StatusCountTable({ title, count }: StatusCountTableProps) {
  /** Calculate the total cound of the statuses */
  const totalCount = Object.values(count).reduce((a, b) => a + b, 0);

  return (
    <TableContainer
      sx={{ borderRadius: "4px", boxShadow: 8, maxWidth: "280px" }}
    >
      <Table size="small">
        <TableHead>
          <TableRow
            sx={{
              background: theme => theme.palette.background.default,
              height: "41px"
            }}
          >
            <TableCell sx={{ pl: 2 }}>
              <Typography variant="subtitle2" data-testid="status-count-title">
                {title}
              </Typography>
            </TableCell>
            <TableCell align="right" sx={{ pr: 2 }}>
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
                <TableCell sx={{ pl: 2 }} component="th" scope="row">
                  <Typography
                    variant="body2"
                    display="flex"
                    alignItems="center"
                    gap="8px"
                  >
                    <StatusIcon status={row as Status} width={24} height={24} />
                    {statuses[row].label.text}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ pr: 2 }}>
                  <Typography variant="body2">{count[row]}</Typography>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
