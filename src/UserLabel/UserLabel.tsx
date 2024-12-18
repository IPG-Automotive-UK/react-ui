import { IconWithLabel } from "../IconWithLabel";
import React from "react";
import { UserAvatar } from "../UserAvatar";
import { UserLabelProps } from "./UserLabel.types";

/**
 * Component that renders a user avatar and the name of the user to the right
 * @param label The name of the user to be displayed
 */
export default function UserLabel({ label, color }: UserLabelProps) {
  return IconWithLabel({
    icon: (
      <div>
        <UserAvatar
          sx={{ height: "24px", width: "24px" }}
          color={color}
          name={label}
        />
      </div>
    ),
    label
  });
}
