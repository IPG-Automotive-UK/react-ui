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
   * @default false
   * @type {boolean}
   */
  isOpen: PropTypes.bool,
  /**
   * The label to delete.
   * @default { color: "#005FA8", description: "", _id: "", name: "" }
   * @type {object}
   * @property {string} color - The color of the label.
   * @property {string} description - The description of the label.
   * @property {string} _id - The id of the label.
   * @property {string} name - The name of the label.
   *
   */
  label: PropTypes.object,
  /**
   * Callback fired when the component requests to be closed.
   *
   * **Signature:**
   * ```
   * function(event: object, string: reason) => void
   * ```
   *
   * - `event`: The event source of the callback.
   * - `reason`: Can be: `"escapeKeyDown"`, `"backdropClick"`.
   *
   * @type {function}
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the delete button is clicked.
   *
   * **Signature:**
   * ```
   * function(object: label) => void
   * ```
   *
   * - `label`: The label object to be deleted.
   *
   * @type {function}
   */
  onDelete: PropTypes.func
};
