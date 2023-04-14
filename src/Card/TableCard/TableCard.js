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

function TableCard({
  action = null,
  tableContent = [],
  title = "Table",
  width = 760
}) {
  return (
    <Card sx={{ width }}>
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
      <CardContent sx={{ padding: 0 }}>
        <TableContainer component={Box}>
          <Table size="small">
            <TableBody>
              {tableContent.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ width: 100 }}>{row[0]}</TableCell>
                  <TableCell
                    sx={{
                      overflowWrap: "anywhere",
                      width: 100
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

export default TableCard;
