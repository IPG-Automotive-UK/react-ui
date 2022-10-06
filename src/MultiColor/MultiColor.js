import { Box, IconButton, Paper, Popover } from "@mui/material";
import React, { useRef } from "react";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import Color from "../Color";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";

/**
 * Multi color component is used to manage a table for value-color pair
 */
export default function MultiColor({ onChange = () => {}, rows = [] }) {
  // add an id for each color/value
  const rowsWithID = rows.map((item, index) => ({ ...item, id: index }));

  // ref for the popover
  const popperRef = useRef();

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
      field: "color",
      headerName: "Color",
      renderCell: params => (
        <div
          style={{
            background:
              params.value === ""
                ? "linear-gradient(to top left, rgba(255,0,0,0) 0%, rgba(255,0,0,0) calc(50% - 0.8px),rgba(255,0,0,1) 50%,rgba(255,0,0,0) calc(50% + 0.8px),rgba(0,0,0,0) 100% )"
                : params.value,
            borderRadius: "4px",
            boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
            height: "15px",
            width: "15px"
          }}
          data-testid="colorCell"
        />
      ),
      renderEditCell: params => (
        <EditCell
          ref={popperRef}
          params={params}
          handleOnColorChange={handleOnColorChange}
          handleOnColorClose={handleOnColorClose}
        />
      ),
      sortable: false,
      type: "string",
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

  // handle color close
  const handleOnColorClose = (event, params) => {
    params.api.setCellMode(params.id, params.field, "view");
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
    const newRow = { color: "rgba(255,0,0,1)", value: null };
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
    <Box
      display="flex"
      flexDirection="column"
      key={rows.length}
      ref={popperRef}
      sx={{ height: "100%", width: "100%" }}
    >
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

const EditCell = React.forwardRef(
  ({ params, handleOnColorChange, handleOnColorClose }, ref) => {
    return (
      <>
        <div ref={ref}></div>
        <Popover
          anchorEl={ref.current}
          onClose={newColor => handleOnColorClose(newColor, params)}
          open
        >
          <Paper sx={{ height: 380, padding: 1, width: 300 }} elevation={3}>
            <Color
              value={params.value}
              onChange={newColor => handleOnColorChange(newColor, params)}
            />
          </Paper>
        </Popover>
      </>
    );
  }
);
EditCell.displayName = "EditCell";

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
  rows: PropTypes.array
};
