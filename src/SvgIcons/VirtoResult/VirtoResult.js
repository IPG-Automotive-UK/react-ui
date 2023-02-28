import * as React from "react";

import PropTypes from "prop-types";
import SvgIcon from "@mui/material/SvgIcon";

// scene result svg
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
        <g filter="url(#filter0_ddd_1329_9359)">
          <rect
            x="3"
            y="2.5"
            width="67"
            height="67"
            rx="12"
            fill="#558B2F"
            shapeRendering="crispEdges"
          />
          <g clipPath="url(#clip0_1329_9359)">
            <path
              d="M37.4722 21.4897V25.9085C42.416 26.6231 46.2222 30.8522 46.2222 36.0002C46.2222 37.3127 45.9597 38.5522 45.5222 39.7043L49.3139 41.9356C50.1305 40.1272 50.5972 38.1147 50.5972 36.0002C50.5972 28.446 44.8368 22.2189 37.4722 21.4897ZM36.0139 46.2085C30.3701 46.2085 25.8055 41.6439 25.8055 36.0002C25.8055 30.8522 29.6118 26.6231 34.5555 25.9085V21.4897C27.1764 22.2189 21.4305 28.4314 21.4305 36.0002C21.4305 44.0502 27.9493 50.5835 35.9993 50.5835C40.8264 50.5835 45.0993 48.2356 47.7535 44.6189L43.9618 42.3877C42.0951 44.721 39.2368 46.2085 36.0139 46.2085Z"
              fill="white"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_ddd_1329_9359"
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
              result="effect1_dropShadow_1329_9359"
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
              in2="effect1_dropShadow_1329_9359"
              result="effect2_dropShadow_1329_9359"
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
              result="effect3_dropShadow_1329_9359"
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
              in2="effect2_dropShadow_1329_9359"
              result="effect3_dropShadow_1329_9359"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect3_dropShadow_1329_9359"
              result="shape"
            />
          </filter>
          <clipPath id="clip0_1329_9359">
            <rect
              width="35"
              height="35"
              fill="white"
              transform="translate(19 18.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
}

// Virto result icon component
export default function VirtoResult({ sx }) {
  return <Icon sx={sx} />;
}

VirtoResult.propTypes = {
  /**
   * styles applied to the svg element
   */
  sx: PropTypes.object
};
