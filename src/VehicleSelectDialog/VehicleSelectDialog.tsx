import { DialogTitle, Stack } from "@mui/material";

import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import React from "react";
import VehicleSelect from "src/VehicleSelect/VehicleSelect";
import { VehicleSelectDialogProps } from "./VehicleSelectDialog.types";
import { VehicleSelectProps } from "src/VehicleSelect/VehicleSelect.types";

// Create a new interface that merges VehicleSelectProps and VehicleSelectDialogProps
interface CombinedProps extends VehicleSelectProps, VehicleSelectDialogProps {}

const VehicleSelectDialog = ({
  onCancelClick,
  onSaveClick,
  title = "Some title",
  cancelText = "cancel",
  saveText = "Save",
  open = true,
  saveDisabled = false,
  width = "400px",
  showCloseIcon = true,
  allVehicles = [],
  selectedVehicles = [],
  flexDirection = "column",
  flexWrap = "nowrap",
  allGates = [],
  onVehicleChange = () => {}
}: CombinedProps) => {
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
          onClick={onSaveClick}
          disabled={saveDisabled}
        >
          {saveText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VehicleSelectDialog;
