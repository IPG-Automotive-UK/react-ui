import { IconButton, DialogTitle as MuiDialogTitle } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import React from "react";

function DialogTitle(props) {
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle sx={{ display: "flex", m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: theme => theme.palette.grey[500],
            height: 40,
            width: 40
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
