import * as React from "react";

import PropTypes from "prop-types";
import SvgIcon from "@mui/material/SvgIcon";
import { pink } from "@mui/material/colors";

// vehicle icon svg
function Icon(props) {
  return (
    <SvgIcon viewBox="0 0 73 74" {...props}>
      <g filter="url(#filter0_ddd_1329_9371)">
        <rect
          x="3"
          y="2.5"
          width="67"
          height="67"
          rx="12"
          fill={pink[800]}
          shapeRendering="crispEdges"
        />
        <path
          d="M30.6667 41.8333C30.6667 38.3333 32.2709 35.2708 34.6042 33.0833H23.375L25.5625 26.5208H41.6042L42.7709 30.1666C43.6459 30.1666 44.5209 30.3124 45.25 30.6041L43.6459 25.7916C43.3542 24.9166 42.4792 24.3333 41.6042 24.3333H25.5625C24.5417 24.3333 23.8125 24.9166 23.5209 25.7916L20.4584 34.5416V46.2083C20.4584 46.9374 21.1875 47.6666 21.9167 47.6666H23.375C24.1042 47.6666 24.8334 46.9374 24.8334 46.2083V44.7499H31.1042C30.8125 43.8749 30.6667 42.8541 30.6667 41.8333ZM25.5625 40.3749C24.3959 40.3749 23.375 39.3541 23.375 38.1874C23.375 37.0208 24.3959 35.9999 25.5625 35.9999C26.7292 35.9999 27.75 37.0208 27.75 38.1874C27.75 39.3541 26.7292 40.3749 25.5625 40.3749ZM42.3334 47.6666V44.7499H37.9584V43.2916H39.4167C41.0209 43.2916 42.3334 41.9791 42.3334 40.3749V38.9166C42.3334 37.3124 41.0209 35.9999 39.4167 35.9999H35.0417V38.9166H39.4167V40.3749H37.9584C36.3542 40.3749 35.0417 41.6874 35.0417 43.2916V47.6666M52.5417 43.2916H49.625V46.2083H46.7084V43.2916H43.7917V40.3749H46.7084V37.4583H49.625V40.3749H52.5417V43.2916Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_ddd_1329_9371"
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
            result="effect1_dropShadow_1329_9371"
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
            in2="effect1_dropShadow_1329_9371"
            result="effect2_dropShadow_1329_9371"
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
            result="effect3_dropShadow_1329_9371"
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
            in2="effect2_dropShadow_1329_9371"
            result="effect3_dropShadow_1329_9371"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect3_dropShadow_1329_9371"
            result="shape"
          />
        </filter>
      </defs>
    </SvgIcon>
  );
}

// Virto vehicle icon component
export default function VirtoVehicle({ sx }) {
  return <Icon sx={sx} />;
}

VirtoVehicle.propTypes = {
  /**
   * styles applied to the svg element
   */
  sx: PropTypes.object
};
