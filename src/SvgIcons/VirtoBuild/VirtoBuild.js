import * as React from "react";

import PropTypes from "prop-types";
import SvgIcon from "@mui/material/SvgIcon";

// build icon svg
function Icon(props) {
  return (
    <SvgIcon viewBox="0 0 74 73" {...props}>
      <svg
        width="74"
        height="73"
        viewBox="0 0 74 73"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_ddd_1329_12196)">
          <rect
            x="3"
            y="2.5"
            width="67"
            height="67"
            rx="12"
            fill="#283593"
            shapeRendering="crispEdges"
          />
          <path
            d="M50.0667 41.9897C50.0813 41.771 50.125 41.5522 50.125 41.3335V42.0627L50.0667 41.9897ZM35.5417 41.3335C35.5417 42.3689 35.7604 43.3606 36.1542 44.2502H28.25V45.7085C28.25 46.5106 27.5938 47.1668 26.7917 47.1668H25.3333C24.5313 47.1668 23.875 46.5106 23.875 45.7085V34.0418L26.9083 25.2918C27.2 24.446 28.0167 23.8335 28.9792 23.8335H45.0208C45.9833 23.8335 46.8 24.446 47.0917 25.2918L50.125 34.0418V41.3335C50.125 37.3085 46.8583 34.0418 42.8333 34.0418C38.8083 34.0418 35.5417 37.3085 35.5417 41.3335ZM31.1667 37.6877C31.1667 36.4772 30.1896 35.5002 28.9792 35.5002C27.7688 35.5002 26.7917 36.4772 26.7917 37.6877C26.7917 38.8981 27.7688 39.8752 28.9792 39.8752C30.1896 39.8752 31.1667 38.8981 31.1667 37.6877ZM47.2083 32.5835L45.0208 26.021H28.9792L26.7917 32.5835H47.2083ZM52.8521 48.9022L46.8583 42.9085C47.4563 41.3918 47.1208 39.6127 45.8667 38.3731C44.5542 37.046 42.5854 36.7835 40.9958 37.5127L43.825 40.3418L41.8563 42.3252L38.9542 39.4814C38.1667 41.071 38.5313 43.0397 39.8146 44.3668C40.3938 44.9577 41.133 45.3663 41.9414 45.5425C42.7498 45.7187 43.5921 45.6547 44.3646 45.3585L50.3583 51.3377C50.6208 51.6147 51.0146 51.6147 51.2771 51.3377L52.7938 49.8356C53.1146 49.5731 53.1146 49.1064 52.8521 48.9022Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_ddd_1329_12196"
            x="0.5"
            y="0"
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
              result="effect1_dropShadow_1329_12196"
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
              in2="effect1_dropShadow_1329_12196"
              result="effect2_dropShadow_1329_12196"
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
              result="effect3_dropShadow_1329_12196"
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
              in2="effect2_dropShadow_1329_12196"
              result="effect3_dropShadow_1329_12196"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect3_dropShadow_1329_12196"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </SvgIcon>
  );
}

// Virto build icon component
export default function VirtoBuild({ sx }) {
  return <Icon sx={sx} />;
}

VirtoBuild.propTypes = {
  /**
   * styles applied to the svg element
   */
  sx: PropTypes.object
};
