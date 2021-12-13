import { Box, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

export default function LabelSetter({
  columns,
  onClickAdd = () => {},
  rows = [],
  onChange = () => {},
  onCellEditCommit = () => {},
  style = {}
}) {
  // add an id for each label/value
  const updatedRows = rows.map((item, index) => ({ ...item, id: index }));

  // handle delete row
  const handleOnDeleteClick = (event, params, updatedRows) => {
    event.ignore = true;
    const idToDelete = params.row.id;
    updatedRows = updatedRows.filter(item => {
      return item.id !== idToDelete;
    });
    console.log(updatedRows);
    onChange(idToDelete);
  };

  // add column for row deletion
  const actionColumn = {
    align: "center",
    disableClickEventBubbling: true,
    field: "actions",
    headerName: "Action",
    renderCell: params => (
      <IconButton
        color="primary"
        onClick={event => handleOnDeleteClick(event, params, updatedRows)}
      >
        <DeleteIcon />
      </IconButton>
    ),
    sortable: false,
    width: 85
  };
  columns.push(actionColumn);

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
