import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import RoadPreview from "./RoadPreview";
import { RoadPreviewProps } from "./RoadPreview.types";

/**
 * Story metadata
 */
const meta: Meta<typeof RoadPreview> = {
  component: RoadPreview,
  title: "RoadView/RoadPreview"
};
export default meta;

// Story Template
const Template: StoryFn<RoadPreviewProps> = args => {
  return <RoadPreview {...args} />;
};

// Default
export const Default = {
  args: {
    createdAt: new Date(),
    description:
      "This is test road description and it must be very long since we need to check -------------------------------------------------------------- how it llookks",
    file: {
      _id: "66d6cc4a33eb2f57a28d36f7",
      name: "CityDrivingGermany_SoftwareVerificattesttesttesttestion.rd5",
      type: "road"
    },
    format: "CarMaker",
    formatVersion: "1.2.5",
    href: "test",
    image: "https://picsum.photos/id/191/400/200",
    label: [
      {
        _id: "66cd9b326217e44d2810e9d3",
        color: "#005FA8",
        createdAt: "2024-08-27T09:24:02.096Z",
        description: "Label 1 desc",
        name: "Label 1--------------rrrrrrrrrrrrrrrrrrrrrrrrrr",
        updatedAt: "2024-08-28T09:39:02.748Z"
      },
      {
        _id: "66cd9b8d6217e44d2810e9f7",
        color: "#005FA8",
        createdAt: "2024-08-27T09:25:33.849Z",
        description: "one2three4",
        name: "&1234",
        updatedAt: "2024-09-03T08:42:18.213Z"
      },
      {
        _id: "66cde4855d45d85421f8620e",
        color: "rgb(121, 0, 168)",
        createdAt: "2024-08-27T14:36:53.275Z",
        description: "desc for hi",
        name: "Test label 3",
        updatedAt: "2024-08-27T14:36:53.275Z"
      },
      {
        _id: "66d6da6a7439a97aa1ad72bc",
        color: "#005FA8",
        createdAt: "2024-09-03T09:44:10.716Z",
        description: "",
        name: "Test 1",
        updatedAt: "2024-09-03T09:44:10.716Z"
      }
    ],
    name: "Road 1, this is a very long road name, so we can test how it looks with overflow ---------------",
    user: "John Doe",
    version: "1.16"
  },
  render: Template
};
