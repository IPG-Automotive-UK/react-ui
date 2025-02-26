import { DateLabelProps } from "./DateLabel.types";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { IconWithLabel } from "../IconWithLabel";
import React from "react";

/**
 * Component that renders a date icon and the date to the right
 * @param label The date string to be displayed
 */
export default function DateLabel({ label, tooltip = "" }: DateLabelProps) {
  return IconWithLabel({
    icon: (
      <DateRangeIcon data-testid="date-icon" sx={{ height: 20, width: 20 }} />
    ),
    label,
    tooltip
  });
}
