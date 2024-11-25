import IconWithLabel from "../IconWithLabel";
import React from "react";
import { RoadIconWithLabelProps } from "./RoadIconWithLabel.types";
import { RoadOutlined } from "../SvgIcons";

export default function RoadIconWithLabel({
  label,
  href
}: RoadIconWithLabelProps) {
  return IconWithLabel({
    href,
    icon: <RoadOutlined />,
    label
  });
}
