import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import React from "react";
import SummaryCard from "./SummaryCard";
import { action } from "@storybook/addon-actions";

export default {
  component: SummaryCard,
  title: "Card/SummaryCard"
};

const Template = args => {
  return (
    <SummaryCard
      {...args}
      onClickLabel={label => {
        action("onLabelClick")(label);
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  content: null,
  height: 600,
  labels: [],
  media: "",
  mediaHeight: 200,
  mediaWidth: 400,
  moreCardActions: null,
  moreOptionsPopover: null,
  onClickLabel: () => {},
  subtitle: "subtitle",
  title: "title",
  width: 450
};

export const TruncatedTitleAndSubtitle = Template.bind({});
TruncatedTitleAndSubtitle.args = {
  ...Default.args,
  subtitle:
    "This is a very long subtitle that will be truncated, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
  title:
    "This is a very long title that will be truncated, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged "
};

export const TruncatedLabels = Template.bind({});
TruncatedLabels.args = {
  ...Default.args,
  labels: [
    {
      _id: "1",
      color: "#fcba03",
      description: "Test Label 1",
      name: "Test Label 1"
    },
    {
      _id: "2",
      color: "#47357a",
      description: "Test Label 2",
      name: "Test Label 2"
    },
    {
      _id: "3",
      color: "#fcba03",
      description: "Test Label 3",
      name: "Test Label 3"
    },
    {
      _id: "4",
      color: "#47357a",
      description: "Test Label 4",
      name: "Test Label 4"
    },
    {
      _id: "5",
      color: "#fcba03",
      description: "Test Label 5",
      name: "Test Label 5"
    }
  ]
};

export const withMoreCardActions = Template.bind({});
withMoreCardActions.args = {
  ...Default.args,
  moreCardActions: (
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
  )
};

export const withMoreOptionsPopover = Template.bind({});
withMoreOptionsPopover.args = {
  ...Default.args,
  moreOptionsPopover: (
    <List>
      <ListItem disablePadding>
        <ListItemButton onClick={action("onEditClick")}>
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={action("onDeleteClick")}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </ListItemButton>
      </ListItem>
    </List>
  )
};

export const ScenarioExample = Template.bind({});
ScenarioExample.args = {
  ...Default.args,
  content: (
    <TableContainer>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Some Description of a road</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell>Germany</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Scenario</TableCell>
            <TableCell>Expressway</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Road Length (m)</TableCell>
            <TableCell>3000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Road Format</TableCell>
            <TableCell>.rd5</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ),
  labels: [
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
  ],
  media: "https://picsum.photos/400/200",
  moreCardActions: (
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
  ),
  moreOptionsPopover: (
    <List>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </ListItemButton>
      </ListItem>
    </List>
  ),
  subtitle: "Uploaded 2 hours ago by Jega Sriskantha ",
  title: "Expressway_3Lanes "
};
