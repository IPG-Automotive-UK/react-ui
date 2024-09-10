import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import { RoadPreview } from "./RoadPreview";
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

/**
 * Default story
 */
export const Default = {
  args: {
    createdAt: "10-09-24 10:24:08",
    description: "Small Description",
    file: {
      _id: "66d6cc4a33eb2f57a28d36f7",
      name: "TestingRoad.rd5",
      type: "road"
    },
    format: "CarMaker",
    formatVersion: "11.1",
    href: "test",
    image: "https://picsum.photos/id/191/400/200",
    label: [
      {
        _id: "66cd9b326217e44d2810e9d3",
        color: "#005FA8",
        createdAt: "2024-08-27T09:24:02.096Z",
        description: "Label 1 desc",
        name: "Label 1--------------rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
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
        _id: "66cde4855d45d85421f8620e",
        color: "rgb(121, 0, 168)",
        createdAt: "2024-08-27T14:36:53.275Z",
        description: "desc for hi",
        name: "Test label 3",
        updatedAt: "2024-08-27T14:36:53.275Z"
      }
    ],
    name: "SanFrancisco_AEB",
    user: "James Harper",
    version: "1.1"
  },
  render: Template
};

/**
 * This story shows a road preview with a very long name, description, file name and user name
 */
export const WithOverflowText = {
  args: {
    ...Default.args,
    description:
      "Stationäre Kreisfahrt: DIN ISO 4138 Es wird innerhalb von 18 Sekunden auf 180° Lenkradwinkel eingelenkt.stationäre Kreisfahrt: DIN ISO 4138 Es wird innerhalb von 18 Sekunden auf 180° Lenkradwinkel eingelenkt.",
    file: {
      ...Default.args.file,
      name: "A very looooooooooong Road File Name"
    },
    format: "ASAM OpenDRIVE",
    label: [Default.args.label.pop()],
    name: "SanFrancisco_AEB_A looooong Road Name",
    user: "James a very long middle name Harper"
  },
  render: Template
};

/**
 * This story shows a road preview without optional properties
 */
export const WithoutOptionalProps = {
  args: {
    description: "Short description",
    file: {
      _id: "66d6cc4a33eb2f57a28d36f7",
      name: "TestingRoad.rd5",
      type: "road"
    },
    format: "CarMaker",
    formatVersion: "11.1",
    href: "test",
    image: "https://picsum.photos/id/191/400/200",
    name: "SanFrancisco_AEB",
    version: "1.1"
  },
  render: Template
};
