import { Avatar } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

/**
 * UserAvatar component
 */
export default function UserAvatar({ img, name = "", color = "rgb(0,0,0)" }) {
  // returns the first char of first name and first char of last name
  const getFirstAndLastChars = str => {
    return str.charAt(0) + str.charAt(str.length - 1);
  };

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
        <Avatar src={img} />
      ) : (
        <Avatar sx={{ backgroundColor: color }}>{initials}</Avatar>
      )}
    </>
  );
}

UserAvatar.propTypes = {
  /**
   * Icon background color
   */
  color: PropTypes.string,
  /**
   * Display Image
   */
  img: PropTypes.string,
  /**
   * Display Name
   */
  name: PropTypes.string
};
