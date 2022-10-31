import FileCard from "./FileCard";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: FileCard,
  title: "Card/FileCard"
};

const Template = args => {
  return (
    <FileCard
      onClickDownload={paths => {
        action("onClickDownload")(paths);
      }}
      onClickFile={file => {
        action("onClickFile")(file);
      }}
      {...args}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  files: [],
  height: 950,
  subtitle: "subtitle",
  title: "All Files",
  width: 460
};

export const ScenarioExample = Template.bind({});
ScenarioExample.args = {
  ...Default.args,
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
        { filename: "anotherRoadTextureFile.png", path: "/somepath/path/file" },
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
};
