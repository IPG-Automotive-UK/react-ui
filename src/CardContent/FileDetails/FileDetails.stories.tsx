import { Meta, StoryFn } from "@storybook/react";

import FileDetails from "./FileDetails";
import { FileDetailsProps } from "./FileDetails.types";
import React from "react";

// import exampleImage from "./exampleRoadImage.png";

/**
 * Story metadata
 */
const meta: Meta<typeof FileDetails> = {
  component: FileDetails,
  title: "CardContent/FileDetails"
};
export default meta;

const Template: StoryFn<FileDetailsProps> = args => {
  return <FileDetails {...args} />;
};

export const Default = {
  args: {
    downloadButtonText: "Download",
    downloadButtonTextOnSearch: "Download Files",
    fileTitle: "title",
    files: [],
    search: ""
  },

  render: Template
};

export const WithFiles = {
  args: {
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
    ]
  },

  render: Template
};
