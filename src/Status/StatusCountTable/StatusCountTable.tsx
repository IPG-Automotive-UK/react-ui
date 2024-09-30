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

  /** Keys of the count object */
  const countKeys = Object.keys(count) as (keyof typeof count)[];

  // Color of the header
  const headerColor = "#5E8AB414";

  return (
    <TableContainer
      sx={{
        backgroundColor: theme => theme.palette.background.default,
        borderRadius: "4px",
        boxShadow: 8,
        maxWidth: "280px"
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow
            sx={{
              height: "40px"
            }}
          >
            <TableCell sx={{ background: headerColor, pl: 2 }}>
              <Typography variant="subtitle2" data-testid="status-count-title">
                {title}
              </Typography>
            </TableCell>
            <TableCell
              align="right"
              sx={{ backgroundColor: headerColor, pr: 2 }}
            >
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
          {countKeys.reverse().map(row => (
            <TableRow
              key={row}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                height: "40px"
              }}
            >
              <TableCell
                sx={{
                  backgroundColor: theme => theme.palette.background.default,
                  pl: 2
                }}
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
                  {statuses[row].label.text}
                </Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  backgroundColor: theme => theme.palette.background.default,
                  pr: 2
                }}
              >
                <Typography variant="body2">{count[row]}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
