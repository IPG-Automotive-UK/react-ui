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
  argTypes: {
    action: {
      control: false
    }
  },
  args: {
    action: null,
    height: "100%",
    tableContent: [],
    title: "Table"
  },

  render: Template
};

export const TableWithContent = {
  argTypes: {
    ...Default.argTypes
  },
  args: {
    ...Default.args,
    tableContent: [
      ["Name", "Example Name"],
      ["Description", "Example Description"]
    ]
  },

  render: Template
};

export const TableWithCustomComponets = {
  argTypes: {
    ...Default.argTypes,
    tableContent: {
      control: false
    }
  },
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
  },

  render: Template
};
