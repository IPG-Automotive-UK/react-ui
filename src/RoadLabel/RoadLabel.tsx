import { IconWithLabel } from "../IconWithLabel";
import React from "react";
import { RoadLabelProps } from "./RoadLabel.types";
import { RoadOutlined } from "../SvgIcons";

/**
 * Component that renders a road icon and the name of the road to the right
 * @param label The name of the road to be displayed
 * @param href The link to the road that is referenced in the label
 */
export default function RoadLabel({ label, href }: RoadLabelProps) {
  return IconWithLabel({
    href,
    icon: <RoadOutlined />,
    label
  });
}
