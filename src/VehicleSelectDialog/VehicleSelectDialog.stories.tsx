import { Meta, StoryFn } from "@storybook/react";
import React, { MouseEventHandler } from "react";

import { Button } from "@mui/material";
import { CombinedVehicleProps } from "./VehicleSelectDialog.types";
import { SelectedVehicle } from "../VehicleSelect/VehicleSelect.types";
import VehicleSelectDialog from "./VehicleSelectDialog";
import { action } from "@storybook/addon-actions";

/**
 * Story metadata
 */
const meta: Meta<typeof VehicleSelectDialog> = {
  component: VehicleSelectDialog,
  title: "Dialog/VehicleSelectDialog"
};

export default meta;
// Default story with all props
const Template: StoryFn<CombinedVehicleProps> = args => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleCancel: MouseEventHandler<HTMLButtonElement> = args => {
    setOpen(false);
    action("onCancelClick")(args);
  };
  const handleSave: (vehicle: SelectedVehicle[]) => void = args => {
    setOpen(false);
    action("onSaveClick")(args);
  };

  // render the dialog with the vehicle select component
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <VehicleSelectDialog
        {...args}
        open={open}
        onCancelClick={handleCancel}
        onSaveClick={handleSave}
      />
    </>
  );
};

export const Default = {
  args: {
    cancelText: "cancel",
    flexDirection: "column",
    flexWrap: "nowrap",
    gates: ["Gate 1", "Gate 2", "Gate 3"],
    saveText: "ADD VEHICLE",
    showCloseIcon: true,
    title: "Add Vehicle",
    variants: [
      {
        _id: "64c8c4cccc8d6f00130b366b",
        modelYear: "2015",
        projectCode: "911",
        variant: "MP - 3.6 l6 - 397kW - 7MT - R20"
      },
      {
        _id: "64c8c4cccc8d6f00130b367e",
        modelYear: "2015",
        projectCode: "911",
        variant: "JS - 3.6 l6 - 397kW - 7MT - R20"
      },
      {
        _id: "64c8c4cccc8d6f00130b3691",
        modelYear: "2016",
        projectCode: "911",
        variant: "DB - 3.6 l6 - 397kW - 7MT - R20"
      },
      {
        _id: "64c8c4cccc8d6f00130b36a4",
        modelYear: "2016",
        projectCode: "911",
        variant: "MC - 397kW - 7MT - R20"
      }
    ],
    width: "800px"
  },
  render: Template
};

export const withErrorMessage = {
  args: {
    cancelText: "cancel",
    errorMessage: "New error message",
    flexDirection: "column",
    flexWrap: "nowrap",
    gates: ["Gate 1", "Gate 2", "Gate 3"],
    saveText: "ADD VEHICLE",
    showCloseIcon: true,
    title: "Add Vehicle",
    variants: [
      {
        _id: "64c8c4cccc8d6f00130b366b",
        modelYear: "2015",
        projectCode: "911",
        variant: "MP - 3.6 l6 - 397kW - 7MT - R20"
      },
      {
        _id: "64c8c4cccc8d6f00130b367e",
        modelYear: "2015",
        projectCode: "911",
        variant: "JS - 3.6 l6 - 397kW - 7MT - R20"
      },
      {
        _id: "64c8c4cccc8d6f00130b3691",
        modelYear: "2016",
        projectCode: "911",
        variant: "DB - 3.6 l6 - 397kW - 7MT - R20"
      },
      {
        _id: "64c8c4cccc8d6f00130b36a4",
        modelYear: "2016",
        projectCode: "911",
        variant: "MC - 397kW - 7MT - R20"
      }
    ],
    width: "800px"
  },
  render: Template
};
