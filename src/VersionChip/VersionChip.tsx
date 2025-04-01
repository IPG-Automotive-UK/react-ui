import { AccountTree, Layers } from "@mui/icons-material";
import { Chip, alpha, chipClasses, useTheme } from "@mui/material";

import React from "react";
import { VersionChipProps } from "./VersionChip.types";

const VersionChip = ({ version, selected = false }: VersionChipProps) => {
  // text and color for selected chip is a different category based on light vs. dark mode
  const theme = useTheme();
  const selectedColor = theme.palette.primary.main;

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
        data-testid="version-chip"
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
              ? `1px solid ${theme.palette.primary.main}`
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
 * A function that returns the minor version,
 * Returns `undefined` if the format is invalid.
 * Accepts formats like "1" or "1.0" but not "1.1.1".
 */
const getMinorVersion = (version: string) => {
  // allow single digit or "major.minor" format (e.g., "1" or "1.0")
  const regex = /^\d+(\.\d+)?$/;

  // validate format
  if (!regex.test(version)) {
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "test"
    ) {
      console.warn(
        `Invalid version format: "${version}". Expected format is "<major>" or <major>.<minor>" (e.g., "1" or "1.0").`
      );
    }
    // return undefined for invalid input
    return undefined;
  }

  // return minor version or "0" if missing
  return version.split(".")[1] ?? "0";
};
