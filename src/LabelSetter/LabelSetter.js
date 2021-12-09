import * as React from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";

export default function LabelSetter({
  headerNames = ["Value", "Label"],
  onClick = () => {},
  rows = [],
  onCellEditCommit = () => {},
  style = {}
}) {
  // set column definition
  const columns = [
    {
      align: "center",
      editable: true,
      field: "value",
      headerName: headerNames[0],
      type: "number"
    },
    {
      align: "center",
      editable: true,
      field: "label",
      headerName: headerNames[1],
      width: 200
    }
  ];

  // add an id for each label/value
  const updatedRows = rows.map((item, index) => ({ ...item, id: index }));

  // return components
  return (
    <Box sx={style} display="flex" flexDirection="column">
      <DataGrid
        hideFooter
        rows={updatedRows}
        columns={columns}
        onCellEditCommit={onCellEditCommit}
      />
      <Button
        sx={{ textTransform: "none", width: "10%" }}
        endIcon={<AddIcon />}
        onClick={onClick}
        variant="contained"
      >
        Add
      </Button>
    </Box>
  );
}
