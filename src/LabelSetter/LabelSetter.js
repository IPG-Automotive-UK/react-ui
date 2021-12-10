import * as React from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";

export default function LabelSetter({
  columns = [],
  onClick = () => {},
  rows = [],
  onCellEditCommit = () => {},
  style = {}
}) {
  // add an id for each label/value
  const updatedRows = rows.map((item, index) => ({ ...item, id: index }));

  // return components
  return (
    <Box sx={style} display="flex" flexDirection="column">
      <DataGrid
        disableColumnSelector
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
