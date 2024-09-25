// StatusCountBar.tsx

import { Box, Fade } from "@mui/material";
import { bindPopper, usePopupState } from "material-ui-popup-state/hooks";

import Popper from "@mui/material/Popper";
import React from "react";
import { StatusCountBarProps } from "./StatusCountBar.types";
import statuses from "../statuses";
import { useDelayedHover } from "../../hover/useDelayedHover";

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
        height="15px"
        width="100%"
        gap={0.5}
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
              title={`${status}: ${countValue}`} // Tooltip as fallback for hover
            />
          );
        })}
      </Box>
      <Popper {...bindPopper(popupState)} sx={{ py: "3px" }}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            {/* <StatusCountTable /> */}
            <h2>Hello table</h2>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default StatusCountBar;
