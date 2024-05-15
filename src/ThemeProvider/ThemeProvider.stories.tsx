import { Meta } from "@storybook/react";
import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";
import React from "react";
import ThemeProvider from "./ThemeProvider";
import { useDemoData } from "@mui/x-data-grid-generator";

/**
 * Story metadata
 */
const meta: Meta<typeof ThemeProvider> = {
  component: ThemeProvider,
  title: "General/ThemeProvider"
};
export default meta;

// DataGrid example
function DataGridTemplate() {
  const { data } = useDemoData({
    dataSet: "Employee",
    editable: true,
    rowLength: 1000,
    visibleFields: ["name", "email", "phone", "country", "company", "position"]
  });
  return (
    <MuiDataGrid
      {...data}
      loading={data.rows.length === 0}
      checkboxSelection
      disableRowSelectionOnClick
    />
  );
}

// DataGrid example
export const DataGrid = {
  args: {},
  render: DataGridTemplate
};
