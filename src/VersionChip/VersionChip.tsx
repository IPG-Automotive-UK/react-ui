import { AccountTree, Layers } from "@mui/icons-material";
import { Chip, alpha, chipClasses, useTheme } from "@mui/material";

import React from "react";
import { VersionChipProps } from "./VersionChip.types";

const VersionChip = ({ version, selected = false }: VersionChipProps) => {
  // text and color for selected chip is a different category based on light vs. dark mode
  const theme = useTheme();
  const selectedColor =
    theme.palette.mode === "dark"
      ? theme.palette.primary.light
      : theme.palette.primary.dark;

  // decide if version major or minor
  const minorVersion = getMinorVersion(version);

  // if minorVersion undefined (error in version) return null
  if (minorVersion === undefined) {
    return null;
  } else {
    // decide if version "major" or "minor"
    const versionType = minorVersion === "0" ? "major" : "minor";

    // return VersionChip component
    return (
      <Chip
        icon={versionType === "major" ? <Layers /> : <AccountTree />}
        label={version}
        variant="filled"
        sx={{
          [`& .${chipClasses.icon}`]: {
            color: theme =>
              selected ? selectedColor : theme.palette.text.primary,
            height: 14,
            m: "0",
            width: 14
          },
          [`& .${chipClasses.label}`]: {
            color: theme =>
              selected ? selectedColor : theme.palette.text.primary,
            p: "0"
          },
          backgroundColor: theme =>
            selected
              ? alpha(theme.palette.info.main, 0.12)
              : theme.palette.background.default,
          border: theme =>
            selected
              ? `1px solid ${theme.palette.primary.light}`
              : `1px solid ${alpha(theme.palette.divider, 0.23)}`,
          gap: "2px",
          height: 24,
          justifyContent: "center",
          minWidth: 62,
          px: "12px",
          py: "4px"
        }}
      />
    );
  }
};

export default VersionChip;

/**
 * A function that returns the minor version, will return `undefined` if format doesn't match number.number
 */
const getMinorVersion = (version: string) => {
  // check format is number.number
  const regex = /^\d+\.\d+$/;

  // Check if the input matches the "number.number" format
  if (!regex.test(version)) {
    // check if dev environment and log warning
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `Version: ${version} is of a wrong format. Format expected is "<major>.<minor>" (e.g., "1.0").`
      );
    }
    // undefined indicates error (minor version could not be extracted)
    return undefined;
  }
  // return minor version
  return version.split(".")[1];
};
