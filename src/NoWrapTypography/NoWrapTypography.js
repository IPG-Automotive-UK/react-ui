import React, { useState } from "react";
import { Tooltip, Typography } from "@mui/material";

import PropTypes from "prop-types";

/**
 * Typography component to show a tooltip if the text overflows.
 */
export default function NoWrapTypography({ children, sx }) {
  const [tooltipEnabled, setTooltipEnabled] = useState(false);

  // if the text overflows its bounding box, then show the tooltip
  const handleShouldShow = ({ currentTarget }) => {
    if (currentTarget.scrollWidth > currentTarget.clientWidth) {
      setTooltipEnabled(true);
    }
  };

  // on mouse leave, hide the tooltip
  const hideTooltip = () => setTooltipEnabled(true);

  return (
    <Tooltip
      title={children}
      disableHoverListener={!tooltipEnabled}
      onMouseEnter={handleShouldShow}
      onMouseLeave={hideTooltip}
    >
      <Typography
        noWrap
        sx={{
          ...sx,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}
      >
        {children}
      </Typography>
    </Tooltip>
  );
}

NoWrapTypography.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The CSS styles applied to the component.
   */
  sx: PropTypes.object
};
