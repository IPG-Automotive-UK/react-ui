import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import TableCard from "./TableCard";
import { action } from "@storybook/addon-actions";

export default {
  component: TableCard,
  title: "Card/TableCard"
};

const Template = args => {
  return <TableCard {...args} />;
};

export const Default = {
  render: Template,

  args: {
    action: null,
    height: "100%",
    tableContent: [],
    title: "Table"
  }
};

export const TableWithContent = {
  render: Template,

  args: {
    ...Default.args,
    tableContent: [
      ["Name", "Example Name"],
      ["Description", "Example Description"],
      ["Component", <CircularProgress key={"component"} />]
    ]
  }
};

export const TableWithAction = {
  render: Template,

  args: {
    ...Default.args,
    action: (
      <Button variant="contained" onClick={action("clicked")}>
        Action
      </Button>
    ),
    tableContent: [
      ["Name", "Example Name"],
      ["Description", "Example Description"],
      ["Component", <CircularProgress key={"component"} />]
    ]
  }
};
