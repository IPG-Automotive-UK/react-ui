import * as React from "react";

import PropTypes from "prop-types";
import SvgIcon from "@mui/material/SvgIcon";
import { blue } from "@mui/material/colors";

// scene icon svg
function Icon(props) {
  return (
    <SvgIcon viewBox="0 0 73 74" {...props}>
      <g filter="url(#filter0_ddd_1329_9010)">
        <rect
          x="3"
          y="2.5"
          width="67"
          height="67"
          rx="12"
          fill={blue[800]}
          shapeRendering="crispEdges"
        />
        <path
          d="M33.5833 24.3333H24.8333C23.2291 24.3333 21.9312 25.6458 21.9312 27.2499L21.9166 44.7499C21.9166 46.3541 23.2291 47.6666 24.8333 47.6666H48.1666C49.7708 47.6666 51.0833 46.3541 51.0833 44.7499V30.1666C51.0833 28.5624 49.7708 27.2499 48.1666 27.2499H36.5L33.5833 24.3333Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_ddd_1329_9010"
          x="0"
          y="0.5"
          width="73"
          height="73"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1329_9010"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_1329_9010"
            result="effect2_dropShadow_1329_9010"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            operator="erode"
            in="SourceAlpha"
            result="effect3_dropShadow_1329_9010"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_1329_9010"
            result="effect3_dropShadow_1329_9010"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect3_dropShadow_1329_9010"
            result="shape"
          />
        </filter>
      </defs>
    </SvgIcon>
  );
}

// Virto data icon component
export default function VirtoData({ sx }) {
  return <Icon sx={sx} />;
}

VirtoData.propTypes = {
  /**
   * styles applied to the svg element
   */
  sx: PropTypes.object
};
