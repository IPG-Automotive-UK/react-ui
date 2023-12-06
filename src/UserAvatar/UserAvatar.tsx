import { Avatar } from "@mui/material";
import React from "react";
import { UserAvatarProps } from "./UserAvatar.types";

// returns the first char of first name and first char of last name
const getFirstAndLastChars = (str: string) => {
  return str.charAt(0) + str.charAt(str.length - 1);
};

/**
 * UserAvatar component
 */
export default function UserAvatar({
  img,
  name = "",
  color = "rgb(0,0,0)",
  sx
}: UserAvatarProps) {
  // set icon name
  let initials = (name === "" ? "?" : name)
    .split(" ")
    .map(s => s[0])
    .join("")
    .toUpperCase();
  initials = initials.length > 2 ? getFirstAndLastChars(initials) : initials;

  // return avatar component
  return (
    <>
      {img ? (
        <Avatar src={img} sx={sx} />
      ) : (
        <Avatar
          sx={[
            {
              backgroundColor: color,
              color: theme => theme.palette.getContrastText(color),
              fontSize: "14px"
            },
            ...(Array.isArray(sx) ? sx : [sx])
          ]}
        >
          {initials}
        </Avatar>
      )}
    </>
  );
}
