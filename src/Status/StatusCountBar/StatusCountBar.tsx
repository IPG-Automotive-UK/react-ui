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
export function StatusCountBar({ title, count }: StatusCountBarProps) {
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
        // Attach the hover handlers
        {...hoverHandler}
        sx={[
          {
            display: "flex",
            gap: "2px",
            padding: "2px",
            width: "100%"
          },
          ...(Array.isArray(hoverHandler.sx)
            ? hoverHandler.sx
            : [hoverHandler.sx])
        ]}
      >
        {Object.entries(count).map(([status, countValue]) => {
          const percentage = (countValue / totalCount) * 100;
          const statusKey = status as keyof typeof statuses;
          const color = statuses[statusKey]?.icon?.color || "grey"; // Get the color from statuses config
          return (
            <Box
              key={status}
              sx={{
                backgroundColor: color,
                height: "14px",
                width: `${percentage}%`
              }}
              data-testid={`status-bar-${status}`}
            />
          );
        })}
      </Box>
      <Popper
        {...bindPopper(popupState)}
        sx={{ py: "3px", zIndex: theme => theme.zIndex.modal }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <StatusCountTable title={title} count={count} />
          </Fade>
        )}
      </Popper>
    </>
  );
}
