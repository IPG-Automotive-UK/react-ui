import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from "@mui/material";

import DialogTitle from "../DialogTitle";
import React from "react";

//  delete label dialog allows for the deleting of specific label objects
export default function DeleteLabelDialog({
  isOpen = false,
  onDelete = () => {},
  onClose = () => {},
  label = { color: "#005FA8", description: "", id: "", name: "" }
}) {
  // return add new label dialog
  return (
    <Dialog maxWidth="sm" fullWidth onClose={onClose} open={isOpen}>
      <DialogTitle
        onClose={onClose}
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
