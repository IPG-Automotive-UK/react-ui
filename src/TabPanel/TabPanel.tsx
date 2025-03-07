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
const TabPanel = ({
  children,
  active,
  variant = "fullWidth",
  onTabChange,
  customChildren
}: TabPanelProps) => {
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

  // map the variant to the aria label
  const variantToAriaLabel = {
    fullWidth: "full width tabs",
    standard: "standard width tabs"
  };

  return (
    <Box
      sx={[
        {
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          height: 1,
          minHeight: 0,
          width: 1
        },
        theme => ({
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: "4px"
        })
      ]}
    >
      <Tabs
        value={activeTab}
        onChange={handleChange}
        indicatorColor="primary"
        variant={variant}
        aria-label={variantToAriaLabel[variant]}
        sx={{
          backgroundColor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px",
          position: "sticky",
          top: 0,
          zIndex: 3
        }}
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
        {customChildren}
      </Tabs>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflowY: "auto",
          width: 1
        }}
        className="tabpanel-container"
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return null;

          return (
            <Box
              role="tabpanel"
              hidden={activeTab !== index}
              key={index}
              id={`tabpanel-${index}`}
              aria-labelledby={`tab-${index}`}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: activeTab === index ? 1 : 0
              }}
            >
              {activeTab === index && child.props.children}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default TabPanel;
