import { Box, Fade } from "@mui/material";
import { bindPopper, usePopupState } from "material-ui-popup-state/hooks";

import Popper from "@mui/material/Popper";
import React from "react";
import { StatusCountBarProps } from "./StatusCountBar.types";
import { StatusCountTable } from "../StatusCountTable";
import statuses from "../statuses";
import { useDelayedHover } from "../../hover/useDelayedHover";

/**
 * Bar component that renders statuses with width depending on the number of items that match that status and color.
 */
const StatusCountBar = ({ title, count }: StatusCountBarProps) => {
  // Popup state for hover interaction
  const popupState = usePopupState({
    popupId: "statusCountPopup",
    variant: "popper"
  });
  // Calculate the total count
  const totalCount = Object.values(count).reduce((a, b) => a + b, 0);
  // Use hover hook
  const hoverHandler = useDelayedHover(popupState, 1000);

  return (
    <>
      <Box
        display="flex"
        height="18px"
        width="100%"
        gap="2px"
        {...hoverHandler} // Attach the hover handlers
      >
        {Object.entries(count).map(([status, countValue]) => {
          const percentage = (countValue / totalCount) * 100;
          const color = statuses[status]?.icon?.color || "grey"; // Get the color from statuses config
          return (
            <Box
              key={status}
              sx={{
                backgroundColor: color,
                width: `${percentage}%`
              }}
              data-testid={`status-bar-${status}`}
            />
          );
        })}
      </Box>
      <Popper {...bindPopper(popupState)} sx={{ py: "3px" }}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <StatusCountTable title={title} count={count} />
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default StatusCountBar;
