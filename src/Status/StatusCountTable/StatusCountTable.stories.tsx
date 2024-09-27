import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import { StatusCountTable } from "./StatusCountTable";
import { StatusCountTableProps } from "./StatusCountTable.types";

/**
 * Story metadata
 */
const meta: Meta<typeof StatusCountTable> = {
  component: StatusCountTable,
  title: "Status/StatusCountTable"
};
export default meta;

// Story Template
const Template: StoryFn<StatusCountTableProps> = args => {
  return <StatusCountTable {...args} />;
};

/**
 * Default story
 */
export const Default = {
  args: {
    count: {
      completed: 15,
      errored: 1,
      failed: 1,
      "no-metrics": 2,
      operational: 5,
      passed: 15,
      pending: 2,
      queued: 1,
      ready: 8,
      running: 5
    },
    title: "Total simulations"
  },
  render: Template
};
