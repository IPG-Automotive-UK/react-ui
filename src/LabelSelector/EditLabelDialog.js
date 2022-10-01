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

import ColorPicker from "react-best-gradient-color-picker";
import DialogTitle from "../DialogTitle";
import LabelChip from "./LabelChip";
import { useTheme } from "@mui/material/styles";

// colour selector component
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

//  allows admins to add a new label
export default function EditLabelDialog({
  isOpen = false,
  options = [],
  onNew = () => {},
  onEdit = () => {},
  onClose = () => {},
  labelDialogTitle = "Label Title",
  label = { color: "#005FA8", description: "", id: "", name: "" }
}) {
  // define state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#005FA8");
  const [thisLabel, setThisLabel] = useState(label);

  // check if label is new
  const isNew = thisLabel.id === "" && thisLabel.name === "";

  // handle cancel
  const handleCancel = () => {
    // reset all the states
    setName("");
    setDescription("");
    setColor("#005FA8");
    onClose();
  };

  // if the label is defined, set the states
  useEffect(() => {
    if (label) {
      setName(label.name);
      setDescription(label.description);
      setColor(label.color);
      setThisLabel(label);
    }
  }, [label, thisLabel]);

  // check if any of the fields have changed if label is defined
  let hasChanged = true;
  if (thisLabel) {
    hasChanged =
      name !== thisLabel.name ||
      description !== thisLabel.description ||
      color !== thisLabel.color;
  }

  // get all option names except the current label
  const optionNames = options
    .filter(option => option.name !== thisLabel.name)
    .map(option => option.name);

  // check if name already exists
  const isLabelNameValid = !optionNames?.includes(name.trim());

  // handle save
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

  // handleClose
  const handleClose = (_event, reason) => {
    // dont close if the user clicks outside the dialog
    if (reason === "backdropClick") {
      return;
    }

    // close the dialog
    onClose();
  };

  // return add new label dialog
  return (
    <Dialog maxWidth="sm" fullWidth onClose={handleClose} open={isOpen}>
      <DialogTitle onClose={handleClose}>{labelDialogTitle}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} id={"new-label-dialog"}>
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
                width={
                  document.getElementById("new-label-dialog")?.offsetWidth -
                    18 || 400
                }
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
