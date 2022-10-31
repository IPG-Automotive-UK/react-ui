import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from "@mui/material";

import DetailCard from "./DetailCard";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: DetailCard,
  title: "Card/DetailCard"
};

const Template = args => {
  return (
    <DetailCard
      {...args}
      onClickLabel={label => {
        action("onLabelClick")(label);
      }}
      onClickEdit={event => {
        action("onClickEdit")({ event });
      }}
      onClickDelete={event => {
        action("onClickDelete")({ event });
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  content: null,
  height: 950,
  labels: [],
  media: "",
  mediaHeight: 200,
  mediaWidth: 400,
  onClickDelete: () => {},
  onClickEdit: () => {},
  onClickLabel: () => {},
  subtitle: "subtitle",
  title: "title",
  width: 1150
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
    },
    {
      _id: "6",
      color: "#47357a",
      description: "Test Label 6",
      name: "Test Label 6"
    },
    {
      _id: "7",
      color: "#fcba03",
      description: "Test Label 7",
      name: "Test Label 7"
    },
    {
      _id: "8",
      color: "#47357a",
      description: "Test Label 8",
      name: "Test Label 8"
    },
    {
      _id: "9",
      color: "#fcba03",
      description: "Test Label 9",
      name: "Test Label 9"
    },
    {
      _id: "10",
      color: "#47357a",
      description: "Test Label 10",
      name: "Test Label 10"
    },
    {
      _id: "11",
      color: "#fcba03",
      description: "Test Label 11",
      name: "Test Label 11"
    },
    {
      _id: "12",
      color: "#47357a",
      description: "Test Label 12",
      name: "Test Label 12"
    }
  ]
};

export const ScenarioExample = Template.bind({});
ScenarioExample.args = {
  ...Default.args,
  content: (
    <>
      <TableContainer sx={{ maxHeight: "100%" }} component={Box}>
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
    </>
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
  subtitle: "Uploaded 2 hours ago by Jega Sriskantha ",
  title: "Expressway_3Lanes "
};
