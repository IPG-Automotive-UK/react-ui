import { ButtonBase, Typography } from "@mui/material";

import React from "react";
import { SelectorButtonProps } from "./SelectorButton.types";

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
      sx={{
        "&:hover": {
          boxShadow: "0 1px 5px 1px rgba(0,0,0,.23)"
        },
        alignItems: "center",
        background: theme => theme.palette.background.paper,
        border: theme => `1px solid ${theme.palette.divider}`,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        height: 248,
        p: 2,
        textAlign: "left",
        transition: ".2s ease-in-out",
        width: 336
      }}
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
