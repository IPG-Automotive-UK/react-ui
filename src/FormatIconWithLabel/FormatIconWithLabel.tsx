import { AsamLogo, CarMakerLogo } from "../SvgIcons";

import { FormatIconWithLabelProps } from "./FormatIconWithLabel.types";
import { IconWithLabel } from "../IconWithLabel";
import React from "react";
import TerminalOutlinedIcon from "@mui/icons-material/TerminalOutlined";

export default function FormatIconWithLabel({
  label
}: FormatIconWithLabelProps) {
  // based on the label choose the correct icon
  switch (label) {
    // If format is "CarMaker" then render "CarMaker" icon
    case "CarMaker":
    case "CM4SL":
      return IconWithLabel({
        icon: <CarMakerLogo sx={{ height: 20, width: 20 }} />,
        label
      });
    // If format is "TruckMaker" then render "TruckMaker" icon
    case "TruckMaker":
    case "TM4SL":
      // TODO should return TM logo
      return IconWithLabel({
        icon: <CarMakerLogo sx={{ height: 20, width: 20 }} />,
        label
      });
    // If format is "ASAM" then render the "ASAM" icon
    case "ASAM OpenSCENARIO XML":
    case "ASAM OpenDRIVE":
      return IconWithLabel({
        icon: <AsamLogo sx={{ height: 20, width: 20 }} />,
        label
      });
    // Render a default icon for any other format
    default:
      return IconWithLabel({
        icon: (
          <TerminalOutlinedIcon
            data-testid="default-format-icon"
            sx={{ height: 20, width: 20 }}
          />
        ),
        label
      });
  }
}
