import { Meta, StoryFn } from "@storybook/react";

import { PrototypePreview } from "./PrototypePreview";
import { PrototypePreviewProps } from "./PrototypePreview.types";
import React from "react";

/**
 * Story metadata
 */
const meta: Meta<typeof PrototypePreview> = {
  argTypes: {
    quality: {
      control: { type: "radio" },
      options: ["errored", "failed", "not-run", "passed", "pending", null]
    }
  },
  component: PrototypePreview,
  title: "Preview/PrototypePreview"
};
export default meta;

// Story Template
const Template: StoryFn<PrototypePreviewProps> = args => {
  return <PrototypePreview {...args} />;
};

/**
 * Default story
 */
export const Default = {
  args: {
    createdAt: "10-09-24 10:24:08",
    description: "Small Description",
    format: "CarMaker",
    formatVersion: "11.1",
    href: "https://ipg-automotive.com",
    image: "https://picsum.photos/id/191/400/200",
    label: [
      {
        _id: "66cd9b326217e44d2810e9d3",
        color: "#003063",
        description: "Label 1 desc",
        name: "&test 09999"
      },
      {
        _id: "66cd9b8d6217e44d2810e9f7",
        color: "#003063",
        description: "one2three4",
        name: "&1234"
      },
      {
        _id: "66cde4855d45d85421f8620e",
        color: "rgb(121, 0, 168)",
        description: "desc for hi",
        name: "Test label 4"
      },
      {
        _id: "66cd24823d45d85421f8620c",
        color: "#003063",
        description: "desc for 1 hi",
        name: "Test label 3"
      },
      {
        _id: "66cd24823f15d85421f8620s",
        color: "#003063",
        description: "last",
        name: "last"
      }
    ],
    name: "Porsche 911 GT2 RS",
    prototypeVersion: "1.1",
    quality: "not-run",
    sx: {
      borderRadius: "8px",
      boxShadow: 3,
      maxWidth: "480px",
      padding: "16px"
    },
    user: { name: "James Harper" }
  },
  render: Template
};

/**
 * This story shows a prototype preview with a very long name, description, format, format version, prototype version and user name
 */
export const WithOverflowText = {
  args: {
    ...Default.args,
    description:
      "Stationäre Kreisfahrt: DIN ISO 4138 Es wird innerhalb von 18 Sekunden auf 180° Lenkradwinkel eingelenkt.stationäre Kreisfahrt: DIN ISO 4138 Es wird innerhalb von 18 Sekunden auf 180° Lenkradwinkel eingelenkt.",
    format: "My Custom Overly Long Format",
    formatVersion: "1000.1000.1000a",
    label: [Default.args.label[0]],
    name: "Porsche 911 looooonoooooooooooooooooooooooooooooooooooooooog Prototype Name",
    prototypeVersion: "77.77.77.77.77",
    quality: "passed",
    user: {
      color: "rgb(236, 64, 122)",
      name: "James a very long middle name that should be truncated Harper"
    }
  },
  render: Template
};

/**
 * This story shows a prototype preview without optional properties
 */
export const WithoutOptionalProps = {
  args: {
    description: "Short description",
    format: "CarMaker",
    formatVersion: "11.1",
    href: "https://ipg-automotive.com",
    image: "https://picsum.photos/id/191/400/200",
    name: "Porsche 911 GT2 RS",
    prototypeVersion: "1.1",
    sx: { ...Default.args.sx }
  },
  render: Template
};
