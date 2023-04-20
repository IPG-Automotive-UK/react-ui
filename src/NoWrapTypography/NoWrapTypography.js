import React, { useState } from "react";
import { Tooltip, Typography } from "@mui/material";

import PropTypes from "prop-types";

/**
 * Typography component to show a tooltip if the text overflows.
 */
export default function NoWrapTypography({ children, sx, variant }) {
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
        component="p" // forces a block element
        sx={[
          {
            hyphens: "auto",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            wordBreak: "break-all"
          },
          ...(Array.isArray(sx) ? sx : [sx])
        ]}
        variant={variant}
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
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object
  ]),
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf([
    "body1",
    "body2",
    "button",
    "caption",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "inherit",
    "overline",
    "subtitle1",
    "subtitle2"
  ])
};
