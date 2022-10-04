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

import ColorPicker from "react-best-gradient-color-picker";
import DialogTitle from "../DialogTitle";
import LabelChip from "./LabelChip";
import { useTheme } from "@mui/material/styles";

// themed color selector component
const ColorSelector = props => {
  const theme = useTheme();
  return (
    <Box
      className={
        theme.palette.mode === "light"
          ? "color-picker-wrapper-light"
          : "color-picker-wrapper-dark"
      }
    >
      <ColorPicker {...props} />
    </Box>
  );
};

//  edit label dialog allows for the editing and creating new specific label objects
export default function EditLabelDialog({
  isOpen = false,
  options = [],
  onNew = () => {},
  onEdit = () => {},
  onClose = () => {},
  labelDialogTitle = "Label Title",
  label = { color: "#005FA8", description: "", id: "", name: "" }
}) {
  // define label states for user input
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#005FA8");

  // the label that is being edited
  const [thisLabel, setThisLabel] = useState(label);

  // color width
  const [colorWidth, setColorWidth] = useState(300);

  // ref for the dialog grid
  const dialogGridRef = useRef();

  // check if label is new and not being edited
  const isNew = thisLabel.id === "" && thisLabel.name === "";

  // reset label states when cancel or close button is clicked
  const handleCancel = () => {
    // reset all the states
    setName("");
    setDescription("");
    setColor("#005FA8");
    onClose();
  };

  // if the label is being edited, set the states to the label's values
  useEffect(() => {
    if (!isNew) {
      setName(label.name);
      setDescription(label.description);
      setColor(label.color);
      setThisLabel(label);
    }
  }, [label, thisLabel]);

  // check that if a label is being edited,
  // changes have been made to the label
  let hasChanged = true;
  if (!isNew) {
    hasChanged =
      name !== thisLabel.name ||
      description !== thisLabel.description ||
      color !== thisLabel.color;
  }

  // get all option names except the current label
  const optionNames = options
    .filter(option => option.name !== thisLabel.name)
    .map(option => option.name);

  // check if name already exists (except for the current label)
  const isLabelNameValid = !optionNames?.includes(name.trim());

  // handle save button click and save the label
  const handleSave = () => {
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
    onClose();
  };

  // handle close button click and close the dialog box
  const handleClose = (_event, reason) => {
    // dont close if the user clicks outside the dialog
    if (reason === "backdropClick") {
      return;
    }

    // close the dialog
    onClose();
  };

  // return the label dialog
  return (
    <Dialog maxWidth="sm" fullWidth onClose={handleClose} open={isOpen}>
      <DialogTitle onClose={handleClose}>{labelDialogTitle}</DialogTitle>
      <DialogContent dividers>
        <Grid
          container
          spacing={2}
          ref={node => {
            dialogGridRef.current = node;

            // if the node is not null, set the color width
            if (node !== null) {
              setColorWidth(node.offsetWidth - 16);
            }
          }}
        >
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
              error={!isLabelNameValid}
              helperText={
                !isLabelNameValid
                  ? "Label name already exists please select a new name"
                  : ""
              }
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
            <Box display="flex" alignItems="center">
              <ColorSelector
                width={colorWidth}
                height={150}
                hideControls
                hidePresets
                value={color}
                onChange={color => setColor(color)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box width="550px" display="flex" justifyContent="center">
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
            !hasChanged
          }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
