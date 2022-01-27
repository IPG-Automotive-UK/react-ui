import { Box, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Color from "../Color";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import React from "react";

/**
 * Multi color component is used to maage a table for number-color pairs
 */

export default function MultiColor({
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
      field: "color",
      headerName: "Color",
      renderCell: params => (
        <Color
          key={params.id}
          value={params.value}
          onChange={event => handleOnColorChange(event, params)}
        />
      ),
      sortable: false,
      type: "actions",
      width: 80
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
      width: 80
    }
  ];

  // handle color change
  const handleOnColorChange = (event, params) => {
    const updatedRows = JSON.parse(JSON.stringify(rows));
    updatedRows[params.id][params.field] = event;
    onChange(updatedRows);
  };

  // handle row deletion
  const handleOnDeleteClick = (event, params) => {
    const updatedRows = JSON.parse(JSON.stringify(rowsWithID)).filter(item => {
      return item.id !== params.row.id;
    });
    onChange(updatedRows);
  };

  // handle row addition
  const handleOnAddClick = () => {
    const newRow = { color: "rgba(255,1,1,1)", value: null };
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

MultiColor.propTypes = {
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
