import React from "react";
import { RoadOutlinedProps } from "./RoadOutlined.types";
import { SvgIcon } from "@mui/material";

/**
 * RoadOutlined icon component
 */
function RoadOutlinedIcon(props: RoadOutlinedProps) {
  return (
    <SvgIcon
      data-testid="road-outlined-icon"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M15.4984 0.5H13.5073V15.5H15.4984V0.5Z" />
      <path d="M2.35844 0.631836H0.5V15.3687H2.35844V0.631836Z" />
      <path d="M8.86399 0.631836H7.00555V4.31605H8.86399V0.631836Z" />
      <path d="M8.86399 6.15723H7.00555V9.84144H8.86399V6.15723Z" />
      <path d="M8.86399 11.6846H7.00555V15.3688H8.86399V11.6846Z" />
    </SvgIcon>
  );
}

/**
 * Renders a road outline icon
 * @param sx Optional prop to render with custom styles
 * @returns Renders a road outline icon
 */
export function RoadOutlined({ sx }: RoadOutlinedProps) {
  return <RoadOutlinedIcon sx={sx} />;
}
