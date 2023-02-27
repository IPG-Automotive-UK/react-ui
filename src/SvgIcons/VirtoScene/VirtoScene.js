import * as React from "react";

import PropTypes from "prop-types";
import SvgIcon from "@mui/material/SvgIcon";

// scene icon svg
function Icon(props) {
  return (
    <SvgIcon viewBox="0 0 73 74" {...props}>
      <svg
        width="73"
        height="74"
        viewBox="0 0 73 74"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_ddd_1329_9335)">
          <rect
            x="3"
            y="2.5"
            width="67"
            height="67"
            rx="12"
            fill="#D84315"
            shapeRendering="crispEdges"
          />
          <path
            d="M45.25 24.3335L48.1666 30.1668H43.7916L40.875 24.3335H37.9583L40.875 30.1668H36.5L33.5833 24.3335H30.6666L33.5833 30.1668H29.2083L26.2916 24.3335H24.8333C23.2291 24.3335 21.9312 25.646 21.9312 27.2502L21.9166 44.7502C21.9166 46.3543 23.2291 47.6668 24.8333 47.6668H48.1666C49.7708 47.6668 51.0833 46.3543 51.0833 44.7502V24.3335H45.25Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_ddd_1329_9335"
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
              result="effect1_dropShadow_1329_9335"
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
              in2="effect1_dropShadow_1329_9335"
              result="effect2_dropShadow_1329_9335"
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
              result="effect3_dropShadow_1329_9335"
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
              in2="effect2_dropShadow_1329_9335"
              result="effect3_dropShadow_1329_9335"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect3_dropShadow_1329_9335"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </SvgIcon>
  );
}

// Virto scene icon component
export default function VirtoScene({ sx }) {
  return <Icon sx={sx} />;
}

VirtoScene.propTypes = {
  /**
   * styles applied to the svg element
   */
  sx: PropTypes.object
};
