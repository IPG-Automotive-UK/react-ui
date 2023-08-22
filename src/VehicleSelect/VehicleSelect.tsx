import {
  SelectedVehicle,
  Vehicle,
  VehicleSelectProps
} from "./VehicleSelect.types";

import Autocomplete from "../Autocomplete";
import { Box } from "@mui/material";
import React from "react";

function VehicleSelect({
  vehicles,
  selectedVehicle = [
    {
      _id: "",
      gate: "",
      modelYear: "",
      project: "",
      variant: ""
    }
  ],
  flexDirection = "column",
  flexWrap = "wrap",
  onVehicleChange = () => {}
}: VehicleSelectProps) {
  // handle vehicle selection change
  const handleVehicleChange = (index: number, vehicle: SelectedVehicle) => {
    // update the vehicle selection at the specified index
    const newVehicleSelections = [...(selectedVehicle as SelectedVehicle[])];
    newVehicleSelections[index] = vehicle;
    onVehicleChange(newVehicleSelections);
  };

  return (
    <>
      {selectedVehicle?.map(
        (selectedVehicle: SelectedVehicle, index: number) => (
          <VehicleSelector
            key={index}
            allGates={["Gate1", "Gate 2", "Gate 3"]}
            flexDirection={flexDirection}
            flexWrap={flexWrap}
            allVehicles={vehicles}
            onVehicleChange={newVehicle =>
              handleVehicleChange(index, newVehicle)
            }
            selectedVehicle={selectedVehicle}
          />
        )
      )}
    </>
  );
}

// component to select a vehicle
function VehicleSelector({
  allGates,
  allVehicles,
  onVehicleChange,
  selectedVehicle,
  flexDirection = "column",
  flexWrap = "wrap"
}: {
  allGates: string[];
  allVehicles: Vehicle[];
  onVehicleChange: (vehicle: SelectedVehicle) => void;
  selectedVehicle: SelectedVehicle;
  flexDirection?: string;
  flexWrap?: string;
}) {
  // create the UI components
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection,
        flexWrap,
        gap: flexDirection === "row" ? 2 : 0
      }}
    >
      <Box
        sx={{ display: "flex", flex: flexDirection === "row" ? "50%" : "100%" }}
      >
        <Autocomplete
          label="Project Code"
          required
          options={[
            ...new Set(allVehicles.map(vehicle => vehicle.projectCode))
          ].sort()}
          onChange={(_event: React.SyntheticEvent, value: string | null) => {
            const newValue = value === null ? "" : value;
            onVehicleChange({
              ...selectedVehicle,
              gate: "",
              modelYear: "",
              project: newValue,
              variant: ""
            });
          }}
          value={
            selectedVehicle.project.length > 0 ? selectedVehicle.project : null
          }
        />
      </Box>
      <Box
        sx={{ display: "flex", flex: flexDirection === "row" ? "50%" : "100%" }}
      >
        <Autocomplete
          disabled={selectedVehicle.project.length === 0}
          label="Model Year"
          required
          options={[
            ...new Set(
              allVehicles
                .filter(
                  vehicle => vehicle.projectCode === selectedVehicle.project
                )
                .map(vehicle => vehicle.modelYear)
            )
          ].sort()}
          onChange={(_event: React.SyntheticEvent, value: string | null) => {
            const newValue = value === null ? "" : value;
            onVehicleChange({
              ...selectedVehicle,
              gate: "",
              modelYear: newValue,
              variant: ""
            });
          }}
          value={
            selectedVehicle.modelYear.length > 0
              ? selectedVehicle.modelYear
              : null
          }
        />
      </Box>
      <Box
        sx={{ display: "flex", flex: flexDirection === "row" ? "50%" : "100%" }}
      >
        <Autocomplete
          disabled={selectedVehicle.modelYear.length === 0}
          label="Vehicle Variant"
          required
          options={[
            ...new Set(
              allVehicles
                .filter(
                  vehicle =>
                    vehicle.projectCode === selectedVehicle.project &&
                    vehicle.modelYear === selectedVehicle.modelYear
                )
                .map(vehicle => vehicle.variant)
            )
          ].sort()}
          onChange={(_event: React.SyntheticEvent, value: string | null) => {
            const newValue = value === null ? "" : value;
            const id =
              allVehicles.find(
                vehicle =>
                  vehicle.projectCode === selectedVehicle.project &&
                  vehicle.modelYear === selectedVehicle.modelYear &&
                  vehicle.variant === newValue
              )?._id ?? "";
            onVehicleChange({
              ...selectedVehicle,
              _id: id,
              gate: "",
              variant: newValue
            });
          }}
          value={
            selectedVehicle.variant.length > 0 ? selectedVehicle.variant : null
          }
        />
      </Box>
      <Box
        sx={{ display: "flex", flex: flexDirection === "row" ? "50%" : "100%" }}
      >
        <Autocomplete
          disabled={selectedVehicle.variant.length === 0}
          required
          label="Gate"
          options={allGates}
          onChange={(_event: React.SyntheticEvent, value: string | null) => {
            const newValue = value === null ? "" : value;
            onVehicleChange({
              ...selectedVehicle,
              gate: newValue
            });
          }}
          value={selectedVehicle.gate.length > 0 ? selectedVehicle.gate : null}
        />
      </Box>
    </Box>
  );
}

export default VehicleSelect;
