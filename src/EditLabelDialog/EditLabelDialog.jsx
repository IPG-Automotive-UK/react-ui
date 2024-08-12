import "./colorSelector.css";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";

import Color from "../Color";
import DialogTitle from "../DialogTitle";
import LabelChip from "../LabelSelector/LabelChip/LabelChip";
import PropTypes from "prop-types";

//  edit label dialog allows for the editing and creating new specific label objects
export default function EditLabelDialog({
  isOpen = false,
  options = [],
  onNew = () => {},
  onEdit = () => {},
  onClose = () => {},
  labelDialogTitle,
  label = { _id: "", color: "#005FA8", description: "", name: "" },
  nameMaxLength = 50
}) {
  // define label states for user input
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#005FA8");

  // check if label is new and not being edited
  const isNew = label._id === "" && label.name === "";

  // reset label states when cancel or close button is clicked
  const handleCancel = () => {
    // close the dialog
    onClose();

    // reset all the states
    setName("");
    setDescription("");
    setColor("#005FA8");
  };

  // if the label changes, update the dependent states
  useEffect(() => {
    setName(label.name);
    setDescription(label.description);
    setColor(label.color);
  }, [label]);

  // if the label is being edited, set the states to the label's values
  useEffect(() => {
    if (!isNew) {
      setName(label.name);
      setDescription(label.description);
      setColor(label.color);
    }
  }, [label, isNew]);

  // check that if a label is being edited,
  // changes have been made to the label
  let hasChanged = true;
  if (!isNew) {
    hasChanged =
      name !== label.name ||
      description !== label.description ||
      color !== label.color;
  }

  // get all option names except the current label
  const optionNames = options
    .filter(option => option.name !== label.name)
    .map(option => option.name);

  // check if name already exists (except for the current label)
  const isLabelNameValid = !optionNames?.includes(name.trim());

  // variable for label name length
  const isLabelLengthValid = name.trim().length <= nameMaxLength;

  // check description value is not whitespace
  const isDescriptionValid =
    description.length > 0 ? description.trim().length > 0 : true;

  // name error message helper function
  const nameErrorMessage = () => {
    if (!isLabelNameValid) {
      return "Label name already exists";
    }
    if (!isLabelLengthValid) {
      return `Label name must be ${nameMaxLength} characters or less`;
    }
    return "";
  };

  // handle save button click and save the label
  const handleSave = event => {
    // if label is new, call onNew otherwise call onEdit
    if (isNew) {
      onNew({ color, description, name });
    } else {
      onEdit({ ...label, color, description, name });
    }

    // reset all the states
    setName("");
    setDescription("");
    setColor("#005FA8");
  };

  // handle close button click and close the dialog box
  const handleClose = (event, reason) => {
    // dont close if the user clicks outside the dialog
    if (reason === "backdropClick") {
      return;
    }
    // close the dialog
    onClose(event, reason);

    // reset all the states
    setName("");
    setDescription("");
    setColor("#005FA8");
    onClose();
  };

  // return the label dialog
  return (
    <Dialog maxWidth="sm" fullWidth onClose={handleClose} open={isOpen}>
      <DialogTitle onClose={handleClose}>{labelDialogTitle}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Label Name"
              variant="outlined"
              required
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              value={name}
              onChange={event => setName(event.target.value)}
              error={!isLabelNameValid || !isLabelLengthValid}
              helperText={nameErrorMessage()}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Label Description"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{
                color: theme => theme.palette.text.secondary,
                fontSize: "12px",
                fontWeight: 400,
                marginLeft: "14px"
              }}
            >
              Label Color *
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Color
              value={color}
              onChange={color => setColor(color)}
              showNoColor={false}
            />
          </Grid>
          <Grid item xs={12}>
            <Box width="100%" display="flex" justifyContent="center">
              {name ? (
                <LabelChip label={name} color={color} size="small" />
              ) : null}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          color="primary"
          disabled={
            name.trim().length === 0 ||
            color.length === 0 ||
            !isLabelNameValid ||
            !hasChanged ||
            !isLabelLengthValid ||
            !isDescriptionValid
          }
        >
          {isNew ? "Add" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// EditLabelDialog Proptypes
EditLabelDialog.propTypes = {
  /**
   * Determines if the dialog is open
   */
  isOpen: PropTypes.bool,
  /**
   * The label object to edit
   */
  label: PropTypes.object,
  /**
   * Callback when user clicks cancel or close
   *
   * **Signature**
   *
   * ```
   * function(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
   * ```
   *
   *  event: The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * Callback when user edits a label
   *
   * **Signature**
   *
   * ```
   * function(label: object) => void
   * ```
   *
   * label: The label object to edit
   */
  onEdit: PropTypes.func,
  /**
   * Callback when user adds a new label
   *
   * **Signature**
   *
   * ```
   * function(label: object) => void
   * ```
   *
   * label: The label object to add
   */
  onNew: PropTypes.func,
  /**
   * The array of label options
   */
  options: PropTypes.array,
  /**
   * The dialog title
   */
  title: PropTypes.string.isRequired
};
