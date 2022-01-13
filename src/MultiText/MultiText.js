import { Box, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import React from "react";

/**
 * Label setter component are used to manage a table for value-label states
 */
export default function LabelSetter({
  onChange = () => {},
  rows = [],
  style = { height: 250, width: "100%" }
}) {
  // add an id for each label/value
  const rowsWithID = rows.map((item, index) => ({ ...item, id: index }));

  // set column definition
  const columns = [
    {
      align: "center",
      editable: true,
      field: "value",
      headerAlign: "center",
      headerName: "Value",
      sortable: false,
      type: "number",
      width: 80
    },
    {
      align: "center",
      editable: true,
      field: "label",
      headerAlign: "center",
      headerName: "Label",
      sortable: false,
      width: 150
    },
    {
      align: "center",
      disableClickEventBubbling: true,
      field: "actions",
      headerName: "Action",
      renderCell: params => (
        <IconButton
          color="primary"
          data-testid="deleteButton"
          onClick={event => handleOnDeleteClick(event, params)}
        >
          <DeleteIcon />
        </IconButton>
      ),
      sortable: false,
      width: 85
    }
  ];

  // handle row deletion
  const handleOnDeleteClick = (event, params) => {
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

  // return components
  return (
    <Box sx={style} display="flex" flexDirection="column" key={rows.length}>
      <DataGrid
        data-testid="dataGrid"
        disableColumnMenu
        disableColumnSelector
        hideFooter
        rows={rowsWithID}
        columns={columns}
        onCellEditCommit={handleEditCell}
      />
      <Box>
        <IconButton
          color="primary"
          data-testid="addButton"
          onClick={handleOnAddClick}
        >
          <AddCircleIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

LabelSetter.propTypes = {
  /**
   * Callback fired when the cell values are changed.
   *
   * **Signature**
   * ```
   * function(event: object) => void
   * ```
   * _event_: The event source of the callback.
   */
  onChange: PropTypes.func,
  /**
   * Set of rows.
   */
  rows: PropTypes.array,
  /**
   * Custom style to apply to the component.
   */
  style: PropTypes.object
};
