import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from "@mui/material";

import DialogTitle from "../../DialogTitle";
import PropTypes from "prop-types";
import React from "react";

//  delete label dialog allows for the deleting of specific label objects
export default function DeleteLabelDialog({
  isOpen = false,
  onDelete = () => {},
  onClose = () => {},
  label = { _id: "", color: "#005FA8", description: "", name: "" }
}) {
  // handle close button click and close the dialog box
  const handleClose = (event, reason) => {
    // dont close if the user clicks outside the dialog
    if (reason === "backdropClick") {
      return;
    }

    // close the dialog
    onClose(event, reason);
  };
  // return delete label dialog
  return (
    <Dialog maxWidth="sm" fullWidth onClose={handleClose} open={isOpen}>
      <DialogTitle
        onClose={handleClose}
      >{` Are you sure you want to delete ${label.name}?`}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          This action cannot be undone and will remove this label from all
          places it is used within this application.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            onDelete(label);
            onClose();
          }}
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// DeleteLabelDialog PropTypes
DeleteLabelDialog.propTypes = {
  /**
   * If true, the component is shown.
   */
  isOpen: PropTypes.bool,
  /**
   * The label to delete.
   */
  label: PropTypes.object,
  /**
   * Callback fired when the component requests to be closed.
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the delete button is clicked.
   */
  onDelete: PropTypes.func
};
