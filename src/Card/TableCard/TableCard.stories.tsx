import { Meta, StoryFn } from "@storybook/react";

import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { TableCard } from "./TableCard";
import { TableCardProps } from "./TableCard.types";
import { action } from "@storybook/addon-actions";

/**
 * Story metadata
 */
const meta: Meta<typeof TableCard> = {
  component: TableCard,
  title: "Card/TableCard"
};
export default meta;

/*
 * Template
 */
const Template: StoryFn<TableCardProps> = args => {
  return <TableCard {...args} />;
};

/*
 * Default story
 */
export const Default = {
  argTypes: {
    action: {
      control: false
    }
  },
  args: {
    action: null,
    tableContent: [],
    title: "Table"
  },

  render: Template
};

/*
 *  Story with text content
 */
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

/*
 *  Story with action and custom components
 */
export const TableWithCustomComponents = {
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
