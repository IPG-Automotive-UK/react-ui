import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton
} from "@mui/material";
import React, { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { CombinedVehicleProps } from "./VehicleSelectDialog.types";
import type { Vehicle } from "../VehicleSelector/VehicleSelector.types";
import VehicleSelector from "../VehicleSelector/VehicleSelector";

const VehicleSelectDialog = ({
  onCancelClick = () => {},
  onSaveClick = () => {},
  errorMessage = "",
  title = "Some title",
  cancelText = "cancel",
  multipleSelection = true,
  saveText = "Save",
  open = true,
  width = "400px",
  showCloseIcon = true,
  variants = [],
  flexDirection = "column",
  flexWrap = "nowrap",
  gates = []
}: CombinedVehicleProps) => {
  // internal state to manage selected vehicles
  const [value, setValue] = useState<Vehicle[]>([]);

  // check if all fields are filled for each selected vehicle
  const isSaveDisabled =
    value.length === 0 ||
    value.some(
      vehicle =>
        !vehicle._id ||
        !vehicle.gate ||
        !vehicle.modelYear ||
        !vehicle.projectCode ||
        !vehicle.variant
    );

  // handle save click will return callback with selected vehicles
  const handleSaveClick = () => {
    if (!isSaveDisabled) {
      onSaveClick(value);
    }
  };

  // reset the state when the dialog is opened
  useEffect(() => {
    if (open) {
      setValue([]);
    }
  }, [open]);

  // render the dialog with the vehicle select component
  return (
    <Dialog
      open={open}
      data-testid="action-dialog"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            maxWidth: width,
            width: "100%"
          }
        }
      }}
    >
      <DialogTitle fontWeight={600} sx={{ px: 2 }}>
        {title}
        {showCloseIcon ? (
          <IconButton
            data-testid="close-icon"
            aria-label="close"
            onClick={onCancelClick}
            sx={{
              position: "absolute",
              right: 8,
              top: 8
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 1 }}>
        <VehicleSelector
          variants={variants}
          value={value}
          flexDirection={flexDirection}
          flexWrap={flexWrap}
          gates={gates}
          onChange={setValue}
          multipleSelection={multipleSelection}
        />
        {errorMessage ? (
          <Box
            sx={{
              display: "flex",
              mt: 2
            }}
          >
            <Alert variant="filled" severity="error">
              {errorMessage}
            </Alert>
          </Box>
        ) : null}
      </DialogContent>
      <DialogActions sx={{ pb: 3, pt: 2, px: 3 }}>
        <Button onClick={onCancelClick}>{cancelText}</Button>
        <Button
          variant="contained"
          onClick={handleSaveClick}
          disabled={isSaveDisabled}
        >
          {saveText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VehicleSelectDialog;
