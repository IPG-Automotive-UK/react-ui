import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import { ScenarioPreview } from "./ScenarioPreview";
import { ScenarioPreviewProps } from "./ScenarioPreview.types";

const meta: Meta<typeof ScenarioPreview> = {
  component: ScenarioPreview,
  title: "Preview/ScenarioPreview"
};
export default meta;

// Story Template
const Template: StoryFn<ScenarioPreviewProps> = args => {
  return <ScenarioPreview {...args} />;
};

/**
 * Default story
 */
export const Default = Template.bind({});
Default.args = {
  createdAt: "23-06-06 08:09:24",
  description: "Small Description",
  file: "RoadName",
  format: "CarMaker",
  formatVersion: "11.1",
  href: "https://example.com",
  image: "https://picsum.photos/id/191/400/200",
  name: "CityDriving",
  roadHref: "https://example.com/road-long",
  roadName: "A very long road name that might overflow",
  sx: {
    borderRadius: 1,
    boxShadow: 3,
    maxWidth: "480px",
    padding: 2
  },
  user: { name: "James Harper" }
};

/**
 * Story with long text to test overflow handling
 */
export const WithOverflowText = Template.bind({});
WithOverflowText.args = {
  ...Default.args,
  description:
    "This is a very long description that might cause overflow issues if not handled properly. The description highlights a scenario with intricate details about the simulation.",
  file: "A_very_very_very_very_very_very_long_long_long_long_long_long_long_long_long_long_long_long_long_long_long_long_scenario_file_name_that_exceeds_typical_length.scn",
  name: "A very very very very very very very very very very very long long long long long scenario name that is unlikely to fit in a single line.",
  roadHref:
    "https://example.com/road-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long",
  roadName:
    "A very long road long road long road long road long road name that might overflow",
  user: {
    color: "rgb(236, 64, 122)",
    name: "A very long user name that might overflow the container"
  }
};

/**
 * Story without optional properties
 */
export const WithoutOptionalProps = Template.bind({});
WithoutOptionalProps.args = {
  description: "A minimal scenario description.",
  file: "MinimalFile.scn",
  format: "Format",
  formatVersion: "1.0",
  href: "https://example.com",
  image: "https://picsum.photos/id/514/400/200",
  name: "Minimal Scenario",
  roadHref: "https://example.com/minimal-road",
  roadName: "Minimal Road",
  sx: {
    borderRadius: 1,
    boxShadow: 3,
    maxWidth: "480px",
    padding: 2
  }
};

/**
 * Story with custom labels
 */
export const WithLabels = Template.bind({});
WithLabels.args = {
  ...Default.args,
  label: [
    { color: "#FFC107", name: "Label 1" },
    { color: "#4CAF50", name: "Label 2" }
  ]
};
