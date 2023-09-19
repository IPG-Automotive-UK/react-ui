import * as React from "react";

import PropTypes from "prop-types";
import SvgIcon from "@mui/material/SvgIcon";

// ID icon svg
function Icon(props) {
  return (
    <SvgIcon viewBox="0 0 73 74" {...props}>
      <g filter="url(#filter0_ddd_1329_9379)">
        <rect
          x="3"
          y="2.5"
          width="67"
          height="67"
          rx="12"
          fill="#6A1B9A"
          shapeRendering="crispEdges"
        />
        <path
          d="M42.3334 34.5417C44.7542 34.5417 46.6938 32.5876 46.6938 30.1667C46.6938 27.7459 44.7542 25.7917 42.3334 25.7917C39.9125 25.7917 37.9584 27.7459 37.9584 30.1667C37.9584 32.5876 39.9125 34.5417 42.3334 34.5417ZM30.6667 34.5417C33.0875 34.5417 35.0271 32.5876 35.0271 30.1667C35.0271 27.7459 33.0875 25.7917 30.6667 25.7917C28.2459 25.7917 26.2917 27.7459 26.2917 30.1667C26.2917 32.5876 28.2459 34.5417 30.6667 34.5417ZM30.6667 37.4584C27.2688 37.4584 20.4584 39.1647 20.4584 42.5626V46.2084H40.875V42.5626C40.875 39.1647 34.0646 37.4584 30.6667 37.4584ZM42.3334 37.4584C41.9105 37.4584 41.4292 37.4876 40.9188 37.5313C42.6105 38.7563 43.7917 40.4042 43.7917 42.5626V46.2084H52.5417V42.5626C52.5417 39.1647 45.7313 37.4584 42.3334 37.4584Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_ddd_1329_9379"
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
            result="effect1_dropShadow_1329_9379"
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
            in2="effect1_dropShadow_1329_9379"
            result="effect2_dropShadow_1329_9379"
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
            result="effect3_dropShadow_1329_9379"
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
            in2="effect2_dropShadow_1329_9379"
            result="effect3_dropShadow_1329_9379"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect3_dropShadow_1329_9379"
            result="shape"
          />
        </filter>
      </defs>
    </SvgIcon>
  );
}

// Virto ID icon component
export default function VirtoID({ sx }) {
  return <Icon sx={sx} />;
}

VirtoID.propTypes = {
  /**
   * styles applied to the svg element
   */
  sx: PropTypes.object
};
