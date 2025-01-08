import * as React from "react";

import SvgIcon from "@mui/material/SvgIcon";
import { TruckMakerLogoProps } from "./TruckMakerLogo.types";

/**
 * Renders a truck maker logo icon
 * @param sx Optional prop to render with custom styles
 * @returns Renders a truck maker logo icon
 */
export function TruckMakerLogo({ sx }: TruckMakerLogoProps) {
  return (
    <SvgIcon
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      data-testid="truck-maker-logo"
      sx={{ ...sx }}
    >
      <rect x="0" width="56" height="56" fill="url(#img_virto)" />
      <defs>
        <pattern
          id="img_virto"
          patternUnits="userSpaceOnUse"
          width="56"
          height="56"
        >
          <image
            id="img_virto"
            width="56"
            height="56"
            xlinkHref="data:image/png;base64,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"
          />
        </pattern>
      </defs>
    </SvgIcon>
  );
}
