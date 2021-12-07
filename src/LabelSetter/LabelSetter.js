import * as React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { uuid } from "uuidv4";

export default function LabelSetter({
  headerNames = ["State value", "State label"],
  rows = [],
  onCellDoubleClick = () => {}
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
  const rowsT = rows.map(item => ({ ...item, id: uuid() }));

  // return components
  return (
    <Box sx={{ height: 300, width: "50%" }}>
      <DataGrid
        hideFooter
        rows={rowsT}
        columns={columns}
        onCellDoubleClick={onCellDoubleClick}
      />
    </Box>
  );
}
