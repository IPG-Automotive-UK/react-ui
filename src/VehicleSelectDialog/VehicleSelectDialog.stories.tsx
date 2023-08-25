import { Meta, StoryFn } from "@storybook/react";
import React, { MouseEventHandler } from "react";

import { Button } from "@mui/material";
import { CombinedVehicleProps } from "./VehicleSelectDialog.types";
import { SelectedVehicle } from "../VehicleSelect/VehicleSelect.types";
import VehicleSelectDialog from "./VehicleSelectDialog";
import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/client-api";

/**
 * Story metadata
 */
const meta: Meta<typeof VehicleSelectDialog> = {
  component: VehicleSelectDialog,
  title: "General/VehicleSelectDialog"
};

export default meta;

const Template: StoryFn<CombinedVehicleProps> = args => {
  const [open, setOpen] = React.useState(false);
  // saveDisabled is a boolean that is passed to the dialog
  const [isSaveDisabled, setIsSaveDisabled] = React.useState(true);

  const handleClickOpen = () => setOpen(true);
  const handleCancel: MouseEventHandler<HTMLButtonElement> = args => {
    setOpen(false);
    action("onCancelClick")(args);
  };
  const handleSave: MouseEventHandler<HTMLButtonElement> = args => {
    if (!isSaveDisabled) {
      setOpen(false);
      action("onSaveClick")(args);
    }
  };

  // useArgs is a hook that returns the current state of the args object
  const [{ selectedVehicles }, updateArgs] = useArgs<CombinedVehicleProps>();

  // update the args object with the new selectedVehicles value
  React.useEffect(() => {
    updateArgs({ selectedVehicles });
    setIsSaveDisabled(!isValidSelection(selectedVehicles));
  }, [selectedVehicles, updateArgs]);

  // callback for when the selected vehicles change
  const onVehicleChange = (selectedVehicle: SelectedVehicle[]) => {
    updateArgs({ selectedVehicles: selectedVehicle });
    action("onVehicleChange")(selectedVehicle);
    setIsSaveDisabled(!isValidSelection(selectedVehicle));
  };

  // check if the selected vehicles are valid (i.e. all fields are filled in)
  const isValidSelection = (selectedVehicles: SelectedVehicle[]) => {
    return selectedVehicles.every(
      vehicle =>
        !!vehicle._id &&
        !!vehicle.gate &&
        !!vehicle.modelYear &&
        !!vehicle.project &&
        !!vehicle.variant
    );
  };

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
        onVehicleChange={onVehicleChange}
        selectedVehicles={selectedVehicles}
        saveDisabled={isSaveDisabled}
      />
    </>
  );
};

export const Default = {
  args: {
    allGates: ["Gate 1", "Gate 2", "Gate 3"],
    allVehicles: [
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
    cancelText: "cancel",
    content: <div>Some content</div>,
    dividers: false,
    flexDirection: "column",
    flexWrap: "nowrap",
    saveDisabled: false,
    saveText: "ADD VEHICLE",
    selectedVehicles: [
      {
        _id: "",
        gate: "",
        modelYear: "",
        project: "",
        variant: ""
      }
    ],
    showCloseIcon: true,
    title: "Add Vehicle",
    width: "800px"
  },
  render: Template
};
