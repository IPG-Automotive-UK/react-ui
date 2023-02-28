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
        <g filter="url(#filter0_ddd_1329_9344)">
          <rect
            x="3"
            y="2.5"
            width="67"
            height="67"
            rx="12"
            fill="#00695C"
            shapeRendering="crispEdges"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M48.1666 22.875H24.8333C23.2291 22.875 21.9166 24.1875 21.9166 25.7917V46.2083C21.9166 47.8125 23.2291 49.125 24.8333 49.125H48.1666C49.7708 49.125 51.0833 47.8125 51.0833 46.2083V25.7917C51.0833 24.1875 49.7708 22.875 48.1666 22.875ZM48.1666 46.2083H24.8333V25.7917H48.1666V46.2083Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M47.3062 33.6958L45.2354 31.625L40.6125 36.2479L38.5562 34.1771L36.5 36.2333L40.6125 40.375L47.3062 33.6958Z"
            fill="white"
          />
          <path
            d="M33.5833 28.7085H26.2916V31.6252H33.5833V28.7085Z"
            fill="white"
          />
          <path
            d="M33.5833 34.5415H26.2916V37.4582H33.5833V34.5415Z"
            fill="white"
          />
          <path
            d="M33.5833 40.375H26.2916V43.2917H33.5833V40.375Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_ddd_1329_9344"
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
              result="effect1_dropShadow_1329_9344"
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
              in2="effect1_dropShadow_1329_9344"
              result="effect2_dropShadow_1329_9344"
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
              result="effect3_dropShadow_1329_9344"
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
              in2="effect2_dropShadow_1329_9344"
              result="effect3_dropShadow_1329_9344"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect3_dropShadow_1329_9344"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </SvgIcon>
  );
}

// Virto test icon component
export default function VirtoTest({ sx }) {
  return <Icon sx={sx} />;
}

VirtoTest.propTypes = {
  /**
   * styles applied to the svg element
   */
  sx: PropTypes.object
};
