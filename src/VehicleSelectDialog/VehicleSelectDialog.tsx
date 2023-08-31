import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
            variants={variants}
            value={value}
            flexDirection={flexDirection}
            flexWrap={flexWrap}
            gates={gates}
            onChange={setValue}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
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
