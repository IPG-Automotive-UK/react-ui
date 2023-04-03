import React, { useState } from "react";
import { Tooltip, Typography } from "@mui/material";

import PropTypes from "prop-types";

/**
 * Typography component to show a tooltip if the text overflows.
 */
export default function NoWrapTypography({ children, maxWidth = "250px", sx }) {
  const [tooltipEnabled, setTooltipEnabled] = useState(false);

  // if the text overflows its bounding box, then show the tooltip
  const handleShouldShow = ({ currentTarget }) => {
    console.log(currentTarget);
    if (currentTarget.scrollWidth > currentTarget.clientWidth) {
      setTooltipEnabled(true);
    }
  };

  const hideTooltip = () => setTooltipEnabled(true);

  return (
    <div
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        width: maxWidth
      }}
    >
      <Tooltip
        title={children}
        disableHoverListener={!tooltipEnabled}
        onMouseEnter={handleShouldShow}
        onMouseLeave={hideTooltip}
      >
        <Typography noWrap sx={sx}>
          {children}
        </Typography>
      </Tooltip>
    </div>
  );
}

NoWrapTypography.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The maximum width of the component.
   */
  maxWidth: PropTypes.string,
  /**
   * The CSS styles applied to the component.
   */
  sx: PropTypes.object
};
