import { IconButton, DialogTitle as MuiDialogTitle } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import React from "react";

function DialogTitle(props) {
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: theme => theme.palette.grey[500],
            position: "absolute",
            right: 8,
            top: 8
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
}

export default DialogTitle;

DialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
};
