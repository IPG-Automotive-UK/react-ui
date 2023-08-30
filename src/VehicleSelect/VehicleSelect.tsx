import Autocomplete from "../Autocomplete";
import { Box } from "@mui/material";
import React from "react";
import { VehicleSelectProps } from "./VehicleSelect.types";

// component to select a vehicle
function VehicleSelect({
  allVehicles = [],
  selectedVehicles = [],
  flexDirection = "column",
  flexWrap = "nowrap",
  allGates = [],
  onVehicleChange = () => {}
}: VehicleSelectProps) {
  // derive state for project
  const selectedProjects = [
    ...new Set(selectedVehicles.map(vehicle => vehicle.project))
  ];

  if (selectedProjects.length > 1)
    throw new Error("Project selection is ambiguous");
  const selectedProject = selectedProjects[0] ?? "";

  // derive all projects
  const allProjects = [
    ...new Set(allVehicles.map(vehicle => vehicle.projectCode))
  ].sort();

  // derive state for model year
  const selectedModelYears = [
    ...new Set(selectedVehicles.map(vehicle => vehicle.modelYear))
  ];
  if (selectedModelYears.length > 1)
    throw new Error("Multiple year is ambiguous");
  const selectedModelYear = selectedModelYears[0] ?? "";

  // derive all model years
  const allModelYears = [
    ...new Set(
      allVehicles
        .filter(v => v.projectCode === selectedProject)
        .map(vehicle => vehicle.modelYear)
    )
  ].sort();

  // derive state for variant
  const selectedVariants = [
    ...new Set(selectedVehicles.map(vehicle => vehicle.variant))
  ]
    .filter(v => v !== "")
    .sort();

  // derive all variants
  const allVariants = [
    ...new Set(
      allVehicles
        .filter(
          v =>
            v.projectCode === selectedProject &&
            v.modelYear === selectedModelYear
        )
        .map(v => v.variant)
    )
  ].sort();

  // derive state for gate
  const selectedGates = [
    ...new Set(selectedVehicles.map(vehicle => vehicle.gate))
  ]
    .filter(v => v !== "")
    .sort();

  return (
    <Box
      data-testid="vehicle-select"
      sx={{
        display: "flex",
        flexDirection,
        flexWrap,
        gap: flexDirection === "row" ? "0 24px" : 0
      }}
    >
      <Box flex="40%">
        <Autocomplete
          label="Project Code"
          required
          multiple={false}
          options={allProjects}
          onChange={(_event, value) => {
            const newValue = value === null ? "" : value;
            onVehicleChange([
              {
                _id: "",
                gate: "",
                modelYear: "",
                project: newValue,
                variant: ""
              }
            ]);
          }}
        />
      </Box>
      <Box flex="40%">
        <Autocomplete
          disabled={selectedProject === ""}
          label="Model Year"
          required
          multiple={false}
          options={allModelYears}
          onChange={(_event, value) => {
            const newValue = value === null ? "" : value;
            onVehicleChange([
              {
                _id: "",
                gate: "",
                modelYear: newValue,
                project: selectedProject,
                variant: ""
              }
            ]);
          }}
        />
      </Box>
      <Box flex="40%">
        <Autocomplete
          disabled={selectedModelYear === ""}
          label="Vehicle Variant"
          required
          multiple={true}
          options={allVariants}
          onChange={(_event, value) => {
            const newVehicles = allVehicles.filter(
              v =>
                v.projectCode === selectedProject &&
                v.modelYear === selectedModelYear &&
                value.includes(v.variant)
            );
            // if no vehicles keep the project and model year but clear the variant and gate in selectedVehicles
            if (newVehicles.length === 0) {
              onVehicleChange([
                {
                  _id: "",
                  gate: "",
                  modelYear: selectedModelYear,
                  project: selectedProject,
                  variant: ""
                }
              ]);
              return;
            }
            // if no gates keep the project, model year and variant but clear the gate in selectedVehicles
            if (selectedGates.length === 0) {
              onVehicleChange(
                newVehicles.map(v => ({
                  _id: v._id,
                  gate: "",
                  modelYear: v.modelYear,
                  project: v.projectCode,
                  variant: v.variant
                }))
              );
            }
            // if gates are selected update the selectedVehicles with the new vehicles and gates
            if (selectedGates.length > 0) {
              const newVehiclesWithGates = selectedGates.flatMap(gate =>
                newVehicles.map(v => ({
                  _id: v._id,
                  gate,
                  modelYear: v.modelYear,
                  project: v.projectCode,
                  variant: v.variant
                }))
              );
              onVehicleChange(newVehiclesWithGates);
            }
          }}
        />
      </Box>
      <Box flex="40%">
        <Autocomplete
          disabled={selectedVariants.length === 0}
          required
          multiple={true}
          label="Gate"
          options={allGates}
          onChange={(_event, value) => {
            const newVehicles = allVehicles.filter(
              v =>
                v.projectCode === selectedProject &&
                v.modelYear === selectedModelYear &&
                selectedVariants.includes(v.variant)
            );
            // if no gates selected keep the project, model year and variant but clear the gate in selectedVehicles
            if (value.length === 0) {
              onVehicleChange(
                newVehicles.map(v => ({
                  _id: v._id,
                  gate: "",
                  modelYear: v.modelYear,
                  project: v.projectCode,
                  variant: v.variant
                }))
              );
              return;
            }
            // if gates are selected update the selectedVehicles with the new vehicles and gates
            const newVehiclesWithGate = value.flatMap(gate =>
              newVehicles.map(v => ({
                _id: v._id,
                gate,
                modelYear: v.modelYear,
                project: v.projectCode,
                variant: v.variant
              }))
            );
            onVehicleChange(newVehiclesWithGate);
          }}
        />
      </Box>
    </Box>
  );
}

export default VehicleSelect;
