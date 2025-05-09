import { ButtonBase, Typography } from "@mui/material";

import React from "react";
import { SelectorButtonProps } from ".";

// Selector Buttons for scene/upload page
export default function SelectorButton({
  icon,
  text,
  description,
  onClick
}: SelectorButtonProps) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={theme => ({
        "&:hover": {
          boxShadow: `0 1px 5px 1px ${theme.palette.action.focus}`
        },

        alignItems: "center",
        background: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        height: 248,
        p: 2,
        textAlign: "left",
        transition: ".2s ease-in-out",
        width: 336
      })}
    >
      {icon}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          lineHeight: 1,
          mb: 1,
          mt: 2
        }}
      >
        {text}
      </Typography>
      <Typography variant="body2">{description}</Typography>
    </ButtonBase>
  );
}
