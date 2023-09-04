import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack
} from "@mui/material";
import React, { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { CombinedVehicleProps } from "./VehicleSelectDialog.types";
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
  variants = [],
  flexDirection = "column",
  flexWrap = "nowrap",
  gates = []
}: CombinedVehicleProps) => {
  // internal state to manage selected vehicles
  const [value, setValue] = useState<SelectedVehicle[]>([]);

  // internal state to say if the vehicle already exists
  const [valueExist, setValueExist] = useState(false);

  // internal state to manage old selections
  const [oldSelection, setOldSelection] = useState<SelectedVehicle[]>([]);

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

  const handleSaveClick = () => {
    // Check for duplicates between the new and old selections
    const hasDuplicates = value.some(vehicle =>
      oldSelection.some(
        oldVehicle =>
          oldVehicle.gate === vehicle.gate &&
          oldVehicle.modelYear === vehicle.modelYear &&
          oldVehicle.projectCode === vehicle.projectCode &&
          oldVehicle.variant === vehicle.variant
      )
    );

    // Update the valueExist state based on whether there are duplicates
    setValueExist(hasDuplicates);

    // If there are no duplicates, and all fields are filled, call onSaveClick
    if (!hasDuplicates && !isSaveDisabled) {
      onSaveClick(value);
      // Save the current selection as part of the old selections
      setOldSelection(prevOldSelection => [...prevOldSelection, ...value]);
    }
  };

  console.log("valueExist", valueExist);

  // reset the state when the dialog is opened
  useEffect(() => {
    if (open) {
      setValue([]);
    }
  }, [open]);

  // handle changes in the selected vehicles
  const handleVehicleSelectChange = (newValue: SelectedVehicle[]) => {
    // Update the selected vehicles immediately when they change
    setValue(newValue);

    // Reset valueExist when the vehicles change
    setValueExist(false);
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
      <Divider />
      <DialogContent sx={{ pt: 1 }}>
        <Stack spacing={3}>
          <VehicleSelect
            variants={variants}
            value={value}
            flexDirection={flexDirection}
            flexWrap={flexWrap}
            gates={gates}
            onChange={handleVehicleSelectChange}
          />
        </Stack>
      </DialogContent>
      {valueExist ? (
        <Alert variant="filled" severity="error">
          {value
            .filter(vehicle =>
              oldSelection.some(
                oldVehicle =>
                  oldVehicle.gate === vehicle.gate &&
                  oldVehicle.modelYear === vehicle.modelYear &&
                  oldVehicle.projectCode === vehicle.projectCode &&
                  oldVehicle.variant === vehicle.variant
              )
            )
            .map(
              vehicle =>
                `${vehicle.projectCode}- ${vehicle.modelYear}- ${vehicle.variant}- ${vehicle.gate}`
            )
            .join(", ")}
          are already added
        </Alert>
      ) : null}
      <DialogActions sx={{ px: 3, py: 2 }}>
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
