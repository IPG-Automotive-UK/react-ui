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
        width: "100%"
      }}
      {...other}
    >
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      {onClose ? (
        <Box
          sx={{
            minWidth: 60
          }}
        >
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: theme => theme.palette.grey[500],
              flexGrow: 0,
              height: 40,
              marginTop: -2,
              width: 40
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
