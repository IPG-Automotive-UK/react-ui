import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from "@mui/material";

import React from "react";
import { TableCardProps } from "./TableCard.types";

export function TableCard({
  action = null,
  tableContent = [],
  title = "Table"
}: TableCardProps) {
  return (
    <Card>
      <CardHeader
        title={
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 500
            }}
            noWrap
          >
            {title}
          </Typography>
        }
        action={action}
      />
      <CardContent sx={{ padding: 0, paddingBottom: "0 !important" }}>
        <TableContainer component={Box}>
          <Table size="small">
            <TableBody>
              {tableContent.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td": {
                      borderBottom: 0
                    }
                  }}
                >
                  <TableCell
                    sx={{
                      overflowWrap: "anywhere",
                      width: "50%"
                    }}
                  >
                    {row[0]}
                  </TableCell>
                  <TableCell
                    sx={{
                      overflowWrap: "anywhere",
                      width: "50%"
                    }}
                  >
                    {row[1]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
