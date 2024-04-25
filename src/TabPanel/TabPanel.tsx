import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";

import { TabPanelProps } from "./TabPanel.types";

/**
 * A component for rendering a tab panel
 *
 * @param props - The props for the tab panel component
 * @property children - The children of the tab panel
 * @property active - The active tab index
 * @returns The tab panel component
 */
const TabPanel = ({ children, active, onTabChange }: TabPanelProps) => {
  // state for the active tab
  const [activeTab, setActiveTab] = useState(active ?? 0);

  // update internal state when the active prop changes
  useEffect(() => {
    setActiveTab(active ?? 0); // Update internal state when the active prop changes
  }, [active]);

  // handle tab change
  const handleChange = (event: React.SyntheticEvent, tab: number) => {
    setActiveTab(tab);

    // call the onTabChange callback if it is provided
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        indicatorColor="primary"
        variant="fullWidth"
        aria-label="full width tabs"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return null;

          return (
            <Tab
              key={index}
              label={child.props["data-label"]}
              sx={{ minWidth: "100px" }}
            />
          );
        })}
      </Tabs>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null;

        return (
          <Box
            role="tabpanel"
            hidden={activeTab !== index}
            key={index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
          >
            {activeTab === index && child.props.children}
          </Box>
        );
      })}
    </Box>
  );
};

export default TabPanel;
