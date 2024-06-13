import {
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import SummaryCard from "./SummaryCard";
import { SummaryCardProps } from "./SummaryCard.types";
import { Theme } from "@mui/material/styles";
import { action } from "@storybook/addon-actions";

/**
 * Story metadata
 */
const meta: Meta<typeof SummaryCard> = {
  component: SummaryCard,
  title: "Card/SummaryCard"
};
export default meta;

const Template: StoryFn<SummaryCardProps> = args => {
  return (
    <SummaryCard
      {...args}
      onClickLabel={label => {
        action("onLabelClick")(label);
      }}
    />
  );
};

/**
 * Supporting components/data for reuse in stories
 */

// labels
const labels = [
  {
    _id: "1",
    color: "#174713",
    description: "National Highways",
    name: "National Highways"
  },
  {
    _id: "2",
    color: "#1D9586",
    description: "Wet Surface",
    name: "Wet Surface"
  },
  {
    _id: "3",
    color: "#fcba03",
    description: "Test Label 1",
    name: "Test Label 1"
  },
  {
    _id: "4",
    color: "#47357a",
    description: "Test Label 2",
    name: "Test Label 2"
  },
  {
    _id: "5",
    color: "#1D9586",
    description: "Test Label 3",
    name: "Test Label 3"
  }
];

// more options dropdown
const MoreOptions = (
  <MenuList>
    <MenuItem onClick={action("onEditClick")}>
      <ListItemIcon>
        <Edit />
      </ListItemIcon>
      <ListItemText primary="Edit" />
    </MenuItem>
    <MenuItem onClick={action("onDeleteClick")}>
      <ListItemIcon>
        <Delete />
      </ListItemIcon>
      <ListItemText primary="Delete" />
    </MenuItem>
  </MenuList>
);

// more card actions
const MoreActions = (
  <>
    <Button
      size="large"
      variant="text"
      sx={{ width: "50%" }}
      onClick={action("onClickMoreDetails")}
    >
      MORE DETAILS
    </Button>
    <Divider
      orientation="vertical"
      flexItem
      sx={{ background: theme => theme.palette.primary.main }}
    />
    <Button
      size="large"
      variant="text"
      sx={{ width: "50%" }}
      onClick={action("onClickViewFiles")}
    >
      VIEW FILES
    </Button>
  </>
);

/**
 * Stories
 */

export const Default = {
  args: {
    content: null,
    height: 557,
    labels: [],
    media: "",
    mediaHeight: 190,
    mediaWidth: 336,
    moreCardActions: null,
    moreOptionsPopover: null,
    onClickLabel: () => {},
    subtitle: "subtitle",
    title: "title",
    width: 368
  },

  render: Template
};

// styling
const sx = {
  headerTableCell: {
    color: (theme: Theme) =>
      theme.palette.mode === "light"
        ? "rgba(0, 0, 0, 0.6)"
        : "rgba(255, 255, 255, 0.7)",
    fontSize: "16px"
  },
  tableCell: {
    fontSize: "16px",
    textAlign: "right"
  }
};

export const TruncatedTitleAndSubtitle = {
  args: {
    ...Default.args,
    subtitle:
      "This is a very long subtitle that will be truncated, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    title:
      "This is a very long title that will be truncated, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged "
  },

  render: Template
};

export const TruncatedLabels = {
  args: {
    ...Default.args,
    labels
  },

  render: Template
};

export const withMoreCardActions = {
  args: {
    ...Default.args,
    moreCardActions: MoreActions
  },

  render: Template
};

export const withMoreOptionsPopover = {
  args: {
    ...withMoreCardActions.args,
    moreOptionsPopover: MoreOptions
  },

  render: Template
};

export const ScenarioExample = {
  args: {
    ...Default.args,
    content: (
      <TableContainer>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell sx={sx.headerTableCell}>Description</TableCell>
              <TableCell sx={sx.tableCell}>Some Description</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={sx.headerTableCell}>Country</TableCell>
              <TableCell sx={sx.tableCell}>Germany</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={sx.headerTableCell}>Scenario</TableCell>
              <TableCell sx={sx.tableCell}>Expressway</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={sx.headerTableCell}>Road Length (m)</TableCell>
              <TableCell sx={sx.tableCell}>3000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={sx.headerTableCell}>Road Format</TableCell>
              <TableCell sx={sx.tableCell}>.rd5</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    ),
    labels,
    media: "https://picsum.photos/400/200",
    moreCardActions: MoreActions,
    moreOptionsPopover: MoreOptions,
    subtitle: "Uploaded 32 minutes ago by Jega Sriskantha ",
    title: "Expressway 3Lanes Extended Road"
  },

  render: Template
};
