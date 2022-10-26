import React from "react";
import SummaryCard from "./SummaryCard";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell
} from "@mui/material";

export default {
  component: SummaryCard,
  title: "Card/SummaryCard"
};

const Template = args => {
  return <SummaryCard {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  title: "title",
  subtitle: "subtitle"
};

export const ScenarioExample = Template.bind({});
ScenarioExample.args = {
  title: "Expressway_3Lanes",
  subtitle: "Uploaded 2 hours ago by Jega Sriskantha ",
  labels: [
    {
      _id: 1,
      color: "#174713",
      description: "National Highways",
      name: "National Highways"
    },
    {
      _id: 2,
      color: "#1D9586",
      description: "Wet Surface",
      name: "Wet Surface"
    },
    {
      _id: 3,
      color: "#fcba03",
      description: "Test Label 1",
      name: "Test Label 1"
    },
    {
      _id: 4,
      color: "#47357a",
      description: "Test Label 2",
      name: "Test Label 2"
    },
    {
      _id: 5,
      color: "#1D9586",
      description: "Test Label 3",
      name: "Test Label 3"
    }
  ],
  media: "https://picsum.photos/400/200",
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
  )
};
