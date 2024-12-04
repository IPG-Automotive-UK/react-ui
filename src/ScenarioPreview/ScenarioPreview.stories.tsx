import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import { ScenarioPreview } from "./ScenarioPreview";
import { ScenarioPreviewProps } from "./ScenarioPreview.types";

/**
 * Story metadata
 */
const meta: Meta<typeof ScenarioPreview> = {
  component: ScenarioPreview,
  title: "ScenarioView/ScenarioPreview"
};
export default meta;

// Story Template
const Template: StoryFn<ScenarioPreviewProps> = args => {
  return <ScenarioPreview {...args} />;
};

/**
 * Default story
 */
export const Default = {
  args: {
    name: "718-2024-CaymanS",
    href: "https://example.com",
    image: "https://picsum.photos/id/101/400/200",
    description: "Small Description",
    format: "AnyRandom Format",
    formatVersion: "1.0",
    file: { _id: "1", name: "TestScenarioFile.scn", type: "scenario" },
    createdAt: "2024-11-13 08:24:08",
    user: "James Harper",
    sx: {
      borderRadius: "8px",
      boxShadow: 3,
      maxWidth: "480px", // this limits the width of th ecomponent
      padding: "16px"
    }
  },
  render: Template
};

/**
 * This story shows a scenario preview with a very long name, description, and file name
 */
export const WithOverflowText = {
  args: {
    ...Default.args,
    description:
      "This is a very long description that might overflow the card container if not handled properly. The description highlights a scenario with intricate details about the simulation.",
    file: {
      _id: "2",
      name: "A_very_loooooong_scenario_file_name.scn",
      type: "scenario"
    },
    name: "A_very_long_scenario_name_2024_with_extra_details",
    user: "James A Very Long Middle Name Harper"
  },
  render: Template
};

/**
 * This story shows a scenario preview without optional properties
 */
export const WithoutOptionalProps = {
  args: {
    name: "SimpleScenario",
    href: "https://example.com",
    image: "https://picsum.photos/id/101/400/200",
    description: "Short description of the scenario",
    format: "Format",
    formatVersion: "1.0",
    file: { _id: "3", name: "ScenarioFile.scn", type: "scenario" },
    sx: { ...Default.args.sx }
  },
  render: Template
};

/**
 * This story shows a scenario preview with minimal labels and a single icon
 */
export const MinimalLabels = {
  args: {
    ...Default.args,
    label: [{ name: "Minimal Label", color: "#FFC107" }]
  },
  render: Template
};
