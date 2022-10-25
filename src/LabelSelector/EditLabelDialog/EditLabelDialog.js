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
import React, { useEffect, useRef, useState } from "react";

import Color from "../../Color";
import DialogTitle from "../../DialogTitle";
import LabelChip from "../LabelChip/LabelChip";
import PropTypes from "prop-types";

//  edit label dialog allows for the editing and creating new specific label objects
export default function EditLabelDialog({
  isOpen = false,
  options = [],
  onNew = () => {},
  onEdit = () => {},
  onClose = () => {},
  labelDialogTitle = "Edit Label",
  label = { color: "#005FA8", description: "", id: "", name: "" },
  nameMaxLength = 50
}) {
  // define label states for user input
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#005FA8");

  // check if label is new and not being edited
  const isNew = label.id === "" && label.name === "";

  // reset label states when cancel or close button is clicked
  const handleCancel = () => {
    // close the dialog
    onClose();

    // reset all the states
    setName("");
    setDescription("");
    setColor("#005FA8");
  };

  // if the label is being edited, set the states to the label's values
  useEffect(() => {
    if (!isNew) {
      setName(label.name);
      setDescription(label.description);
      setColor(label.color);
    }
  }, [label]);

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
    onClose(event, "save");
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
              style={{
                color: "rgba(0,0,0,0.54)",
                fontSize: "12px",
                fontWeight: 400,
                marginLeft: "16px"
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
            name.length === 0 ||
            color.length === 0 ||
            !isLabelNameValid ||
            !hasChanged ||
            !isLabelLengthValid
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
   * If true, the component is shown.
   * @default false
   * @type {boolean}
   */
  isOpen: PropTypes.bool,
  /**
   * The label to be edited.
   * @default { color: "#005FA8", description: "", id: "", name: "" }
   * @type {object}
   * @property {string} color The color of the label.
   * @property {string} description The description of the label.
   * @property {string} id The id of the label.
   * @property {string} name The name of the label.
   *
   */
  label: PropTypes.object,
  /**
   * The title of the dialog.
   * @default "Edit Label"
   * @type {string}
   */
  labelDialogTitle: PropTypes.string,
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
   * Callback fired when a label is edited.
   *
   * **Signature**
   * ```
   * function(label: object) => void
   * ```
   *
   * _label_: The label that is edited.
   * @default () => {}
   * @type {function}
   */
  onEdit: PropTypes.func,
  /**
   * Callback fired when a new label is added.
   *
   * **Signature**
   * ```
   * function(label: object) => void
   * ```
   *
   * _label_: The label that is added.
   * @default () => {}
   * @type {function}
   */
  onNew: PropTypes.func,
  /**
   * The array of label objects that are options to render in the listbox.
   * @default []
   * @type {array}
   *
   * @example
   * [
   *  {
   *   _id: "5f9f1b9b0b5b9c0b8c8b4567",
   *  name: "Label 1",
   * description: "Description 1",
   * color: "#ff0000"
   * },
   * {
   *  _id: "5f9f1b9b0b5b9c0b8c8b4568",
   * name: "Label 2",
   * description: "Description 2",
   * color: "#00ff00"
   * }
   * ]
   */
  options: PropTypes.array
};
