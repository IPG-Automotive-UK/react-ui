import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import { VirtoThinkingProps } from "./VirtoThinking.types";

function Icon(props: VirtoThinkingProps) {
  const { sx } = props;

  return (
    <SvgIcon
      viewBox="0 0 336 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      sx={{ ...sx }}
    >
      <rect x="0.329102" width="335.664" height="400" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_1898_22233"
            transform="matrix(0.000925926 0 0 0.000777001 0 -0.245921)"
          />
        </pattern>
        <image
          id="image0_1898_22233"
          width="1080"
          height="1920"
        />
      </defs>
    </SvgIcon>
  );
}

export default function VirtoThinking({ sx }: VirtoThinkingProps) {
  return <Icon sx={sx} />;
}