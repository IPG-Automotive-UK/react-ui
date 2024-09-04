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
        <Box
          sx={{
            textAlign: "right"
          }}
        >
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: theme => theme.palette.grey[500],
              flexGrow: 0,
              height: 35,
              marginTop: -1,
              width: 35
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      ) : null}
    </MuiDialogTitle>
  );
};

export default DialogTitle;
