import { Box, IconButton, DialogTitle as MuiDialogTitle } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import type { DialogTitleProps } from "./DialogTitle.types";
import React from "react";

/**
 * This component is based on the material DialogTitle. It supports all the props that the material DialogTitle supports and adds extra functionality to show a close button.
 */
const DialogTitle = ({ children, onClose, ...other }: DialogTitleProps) => {
  return (
    <MuiDialogTitle
      sx={{
        display: "flex",
        m: 0,
        p: 2,
        pr: 1
      }}
      {...other}
    >
      <Box
        sx={{
          flexGrow: 1,
          overflowWrap: "anywhere"
        }}
      >
        {children}
      </Box>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            flexGrow: 0,
            height: 35,
            marginTop: -0.3,
            width: 35
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

export default DialogTitle;
