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
  height: 950,
  labels: [],
  media: "",
  mediaHeight: 200,
  mediaWidth: 1100,
  onClickDelete: () => {},
  onClickEdit: () => {},
  onClickLabel: () => {},
  subtitle: "subtitle",
  title: "title",
  width: 1150
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
