import { AccountTree, Layers } from "@mui/icons-material";
import { Chip, alpha, chipClasses, useTheme } from "@mui/material";

import React from "react";
import { VersionChipProps } from "./VersionChip.types";

const VersionChip = ({
  versionType,
  version,
  selected = false
}: VersionChipProps) => {
  // text and color for selected chip is a different category based on light vs. dark mode
  const theme = useTheme();
  const selectedColor =
    theme.palette.mode === "dark"
      ? theme.palette.primary.light
      : theme.palette.primary.dark;
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
            : `1px solid ${theme.palette.divider}`,
        gap: "2px",
        height: 24,
        justifyContent: "center",
        minWidth: 62,
        px: "12px",
        py: "4px"
      }}
    />
  );
};

export default VersionChip;
