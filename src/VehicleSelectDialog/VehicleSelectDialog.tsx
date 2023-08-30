import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { CombinedVehicleProps } from "./VehicleSelectDialog.types";
import React from "react";
import { SelectedVehicle } from "src/VehicleSelect/VehicleSelect.types";
import VehicleSelect from "src/VehicleSelect/VehicleSelect";

const VehicleSelectDialog = ({
  onCancelClick = () => {},
  onSaveClick = () => {},
  title = "Some title",
  cancelText = "cancel",
  saveText = "Save",
  open = true,
  width = "400px",
  showCloseIcon = true,
  allVehicles = [],
  selectedVehicles = [],
  flexDirection = "column",
  flexWrap = "nowrap",
  allGates = [],
  onVehicleChange = () => {}
}: CombinedVehicleProps) => {
  // check if all fields are filled for each selected vehicle
  const isSaveDisabled = selectedVehicles.some(
    vehicle =>
      !vehicle._id ||
      !vehicle.gate ||
      !vehicle.modelYear ||
      !vehicle.project ||
      !vehicle.variant
  );

  // handle save click will return callback with selected vehicles
  const handleSaveClick = (selectedVehicles: SelectedVehicle[]) => {
    if (!isSaveDisabled) {
      onSaveClick(selectedVehicles);
    }
  };
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
        },
        "& .MuiDialogActions-root": {
          p: [2, 3]
        }
      }}
    >
      <DialogTitle fontWeight={600}>
        {title}
        {showCloseIcon ? (
          <IconButton
            data-testid="close-icon"
            aria-label="close"
            onClick={onCancelClick}
            sx={{
              color: theme => theme.palette.grey[500],
              position: "absolute",
              right: 8,
              top: 8
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <VehicleSelect
            allVehicles={allVehicles}
            selectedVehicles={selectedVehicles}
            flexDirection={flexDirection}
            flexWrap={flexWrap}
            allGates={allGates}
            onVehicleChange={onVehicleChange}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelClick}>{cancelText}</Button>
        <Button
          variant="contained"
          onClick={() => handleSaveClick(selectedVehicles)}
          disabled={isSaveDisabled}
        >
          {saveText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VehicleSelectDialog;