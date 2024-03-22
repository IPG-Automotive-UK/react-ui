import { Meta, StoryFn } from "@storybook/react";

import Box from "@mui/material/Box";
import React from "react";
import TabPanel from "./TabPanel";
import { TabPanelProps } from "./TabPanel.types";
import { TextField } from "@mui/material";
import { useArgs } from "@storybook/preview-api";

/**
 * Story metadata
 */
const meta: Meta<typeof TabPanel> = {
  component: TabPanel,
  title: "Layout/TabPanel"
};
export default meta;

// Story Template
const Template: StoryFn<TabPanelProps> = args => {
  // useArgs is a hook that returns the current state of the args object
  const [{ active }, updateArgs] = useArgs<TabPanelProps>();

  // update the args object with the new value value
  React.useEffect(() => {
    updateArgs({ active });
  }, [active, updateArgs]);

  return <TabPanel {...args} active={active} />;
};

// Default
export const Default = {
  args: {
    children: [
      <Box data-label="Select Vehicle" key="1">
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <TextField
            label="Project Code*"
            variant="outlined"
            margin="normal"
            sx={{ ml: 1 }}
          />
          <TextField
            label="Model Year"
            variant="outlined"
            margin="normal"
            sx={{ ml: 1 }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <TextField
            label="Variant"
            variant="outlined"
            margin="normal"
            sx={{ ml: 1 }}
          />
        </Box>
      </Box>,
      <Box data-label="Select Part" key="2">
        <Box sx={{ display: "flex" }}>
          <TextField
            label="Part Name*"
            variant="outlined"
            margin="normal"
            sx={{ ml: 1 }}
          />
        </Box>
        <Box sx={{ display: "flex" }}>
          <TextField
            label="Part Number*"
            variant="outlined"
            margin="normal"
            sx={{ ml: 1 }}
          />
        </Box>
      </Box>,
      <Box data-label="Select Parameter" key="3">
        <Box sx={{ display: "flex" }}>
          <TextField
            label="Parameter*"
            variant="outlined"
            margin="normal"
            sx={{ marginLeft: 1 }}
          />
        </Box>
      </Box>
    ]
  },
  render: Template
};
