import { Box, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

export default function LabelSetter({
  columns,
  rows = [],
  onChange = () => {},
  style = {}
}) {
  // add an id for each label/value
  const rowsWithID = rows.map((item, index) => ({ ...item, id: index }));

  // handle row deletion
  const handleOnDeleteClick = (event, params) => {
    console.log(params);
    const updatedRows = JSON.parse(JSON.stringify(rowsWithID)).filter(item => {
      return item.id !== params.row.id;
    });
    onChange(updatedRows);
  };

  // handle row addition
  const handleOnAddClick = () => {
    const newRow = { label: "", value: null };
    const updatedRows = JSON.parse(JSON.stringify(rows));
    updatedRows.push(newRow);
    onChange(updatedRows);
  };

  // handle edit cell
  const handleEditCell = params => {
    const updatedRows = JSON.parse(JSON.stringify(rows));
    updatedRows[params.id][params.field] = params.value;
    onChange(updatedRows);
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
        onClick={event => handleOnDeleteClick(event, params)}
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
    <Box sx={style} display="flex" flexDirection="column" key={rows.length}>
      <DataGrid
        disableColumnMenu
        disableColumnSelector
        hideFooter
        rows={rowsWithID}
        columns={columns}
        onCellEditCommit={handleEditCell}
      />
      <Box>
        <IconButton color="primary" onClick={handleOnAddClick}>
          <AddCircleIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
