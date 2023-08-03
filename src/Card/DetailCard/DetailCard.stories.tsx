import { Box, Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Meta, StoryFn } from "@storybook/react";

import DetailCard from ".";
import { DetailCardProps } from "./DetailCard.types";
import React from "react";
import TableCard from "../TableCard";
import { action } from "@storybook/addon-actions";

/**
 * Story metadata
 */
const meta: Meta<typeof DetailCard> = {
  component: DetailCard,
  title: "Card/DetailCard"
};
export default meta;

const Template: StoryFn<DetailCardProps> = args => {
  return (
    <DetailCard
      {...args}
      onClickLabel={label => {
        action("onLabelClick")(label);
      }}
      onClickDownload={action("onClickDownload")}
      onClickFile={action("onClickFile")}
    />
  );
};

export const Default = {
  render: Template,

  args: {
    content: null,
    labels: [],
    media: "",
    mediaHeight: 200,
    mediaWidth: 400,
    onClickDownload: () => {},
    onClickFile: () => {},
    onClickLabel: () => {},
    subtitle: "subtitle",
    title: "title",
    width: 1150
  }
};

export const TruncatedTitleAndSubtitle = {
  render: Template,

  args: {
    ...Default.args,
    subtitle:
      "This is a very long subtitle that will be truncated, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    title:
      "This is a very long title that will be truncated, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged "
  }
};

export const withMoreButtons = {
  render: Template,

  args: {
    ...Default.args,
    buttonsStack: (
      <>
        <Button
          sx={{ height: 42 }}
          onClick={action("onClickEdit")}
          startIcon={<Edit />}
          variant="outlined"
        >
          Edit
        </Button>
        <Button
          sx={{ height: 42 }}
          color="error"
          endIcon={<Delete />}
          onClick={action("onClickDelete")}
          variant="outlined"
        >
          Delete
        </Button>
      </>
    )
  }
};

export const TruncatedLabels = {
  render: Template,

  args: {
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
  }
};

export const ScenarioExample = {
  render: Template,

  args: {
    ...Default.args,
    buttonsStack: (
      <>
        <Button
          sx={{ height: 42 }}
          onClick={action("onClickEdit")}
          startIcon={<Edit />}
          variant="outlined"
        >
          Edit
        </Button>
        <Button
          sx={{ height: 42 }}
          color="error"
          startIcon={<Delete />}
          onClick={action("onClickDelete")}
          variant="outlined"
        >
          Delete
        </Button>
      </>
    ),
    content: (
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: "8px", pb: "2px" }}
      >
        <TableCard
          key={"scenario"}
          title="Scenario"
          tableContent={[
            ["Scenario name", "Example Name"],
            ["Description", "Example Description"],
            ["CarMaker version", 11.0],
            ["OpenScenario version", 1.0],
            ["Requires external scenario files", "No"],
            ["Requires external Road Files", "No"],
            ["Active Routes", "Test Route 1, Test Route 2"]
          ]}
        />
        <TableCard
          key={"Road"}
          title="Road"
          tableContent={[
            ["CarMaker version", "11"],
            ["Country", "Germany"],
            ["Data source type", "Example Data Source Type"],
            ["Description", "Example Description"],
            ["Elevation profile", "Some profile"],
            ["File references", "Some file references"],
            ["Maximum Friction Coefficient", 0.8],
            ["Junctions Present", "Yes"],
            ["Lane Width", 2],
            ["Max. Number of lanes in any lane section", 3],
            ["Max lane width", 2],
            ["Markings present", "Yes"],
            ["Name", "Example Name"],
            ["Number of lanes", 2],
            ["Number of links", 2],
            ["Number of junctions", 10],
            ["Number of routes", 10],
            ["Road format", "Example Road Format"],
            ["Road gradiant", 0.1],
            ["Route names", "Test Route 1, Test Route 2"],
            ["Route lenghts", "100m, 200m"],
            ["Road network length", 1000],
            ["Road network width", 100],
            ["Road type mix", "Example Road Type Mix"],
            ["Speed Limits", 100],
            ["Test Track", "Lommel"],
            ["Traffic Barriers", 1],
            ["Traffic Signs", 10],
            ["Traffic Lights", 21]
          ]}
        />
        <TableCard key={"Maneuver"} title="Maneuver" />
        <TableCard key={"Misc"} title="Misc" />
      </Box>
    ),
    downloadButtonText: "Download All Files",
    downloadButtonTextOnSearch: "Download Search Files",
    fileTitle: "Files",
    files: [
      {
        files: [{ filename: "roadFile.rd5", path: "/somepath/path/file" }],
        header: "Road Files"
      },
      {
        files: [
          { filename: "roadInfographic1.png", path: "/somepath/path/file" },
          {
            filename: "someOtherRoadInfographic.gif",
            path: "/somepath/path/file"
          },
          { filename: "coolRoadInfographic.jpg", path: "/somepath/path/file" }
        ],
        header: "Road Infographics"
      },
      {
        files: [
          {
            filename:
              "veryveryverylongroadtexturefilenamethatexceedsthewidthofthecard.png",
            path: "/somepath/path/file"
          },
          {
            filename: "anotherRoadTextureFile.png",
            path: "/somepath/path/file"
          },
          { filename: "roadTextureFile.jpg", path: "/somepath/path/file" },
          { filename: "roadTextureFile2.jpg", path: "/somepath/path/file" },
          { filename: "roadTextureFile3.png", path: "/somepath/path/file" },
          { filename: "roadTextureFile4.jfif", path: "/somepath/path/file" }
        ],
        header: "Road Texture Files"
      },
      {
        files: [{ filename: "ScenarioFile", path: "/somepath/path/file" }],
        header: "Scenario Files"
      },
      {
        files: [
          { filename: "scenarioInfographic1.jpg", path: "/somepath/path/file" },
          { filename: "scenarioInfographic2.png", path: "/somepath/path/file" }
        ],
        header: "Scenario Infographics"
      }
    ],
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
  }
};
