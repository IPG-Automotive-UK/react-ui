import * as React from "react";
import { Box, Button, FormControlLabel, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

export default function LabelSetter({
  columns,
  onClickAdd = () => {},
  onClickDelete,
  rows = [],
  onCellEditCommit = () => {},
  style = {}
}) {
  // add column for row deletion
  const DeleteButton = ({ index }) => {
    return (
      <FormControlLabel
        label=""
        control={
          <IconButton color="primary" onClick={onClickDelete}>
            <DeleteIcon />
          </IconButton>
        }
      />
    );
  };
  const actionColumn = {
    align: "right",
    disableClickEventBubbling: true,
    field: "actions",
    headerName: "Action",
    renderCell: params => {
      return (
        <div style={{ cursor: "pointer" }}>
          <DeleteButton index={params.row.id} />
        </div>
      );
    },
    sortable: false,
    width: 85
  };
  columns.push(actionColumn);

  // add an id for each label/value
  const updatedRows = rows.map((item, index) => ({ ...item, id: index }));

  // return components
  return (
    <Box sx={style} display="flex" flexDirection="column">
      <DataGrid
        disableColumnMenu
        disableColumnSelector
        hideFooter
        rows={updatedRows}
        columns={columns}
        onCellEditCommit={onCellEditCommit}
      />
      <Button
        sx={{ textTransform: "none", width: "10%" }}
        endIcon={<AddIcon />}
        onClick={onClickAdd}
        variant="contained"
      >
        Add
      </Button>
    </Box>
  );
}
