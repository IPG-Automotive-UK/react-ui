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
import React, { useState } from "react";

import Color from "../Color";
import DialogTitle from "../DialogTitle";
import LabelChip from "./LabelChip";

//  allows admins to add a new label
export default function AddNewLabelDialog({
  isOpen = false,
  options = [],
  onNewLabel = () => {},
  onClose = () => {}
}) {
  // define state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#005FA8");

  // handle cancel
  const handleCancel = () => {
    // reset all the states
    setName("");
    setDescription("");
    setColor("#005FA8");
    onClose();
  };

  // is label name valid
  const isLabelNameValid = !options.includes(name.trim());

  // handle save
  const handleSave = () => {
    onNewLabel({ color, description, name });

    // reset all the states
    setName("");
    setDescription("");
    setColor("#005FA8");
    onClose();
  };

  // return add new label dialog
  return (
    <Dialog maxWidth="sm" fullWidth onClose={onClose} open={isOpen}>
      <DialogTitle onClose={onClose}>Add A New Label</DialogTitle>
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
              <Color
                swatchSize="large"
                onChange={color => setColor(color)}
                colorPickerWidth="550px"
                value={color}
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
          onClick={handleSave}
          color="primary"
          disabled={
            name.length === 0 || color.length === 0 || !isLabelNameValid
          }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
