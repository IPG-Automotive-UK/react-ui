import Autocomplete from "../Autocomplete";
import { Box } from "@mui/material";
import React from "react";
import { VehicleSelectProps } from "./VehicleSelect.types";

// component to select a vehicle
function VehicleSelect({
  flexDirection = "column",
  flexWrap = "nowrap",
  gates = [],
  onChange = () => {},
  value = [],
  variants = []
}: VehicleSelectProps) {
  // derive state for selected project
  const selectedProjects = [
    ...new Set(value.map(vehicle => vehicle.projectCode))
  ];
  if (selectedProjects.length > 1)
    throw new Error("Project selection is ambiguous");
  const selectedProject = selectedProjects[0] ?? null;

  // derive state for all projects
  const allProjects = [
    ...new Set(variants.map(vehicle => vehicle.projectCode))
  ].sort();

  // derive state for selected model year
  const selectedModelYears = [
    ...new Set(value.map(vehicle => vehicle.modelYear))
  ];
  if (selectedModelYears.length > 1)
    throw new Error("Multiple year is ambiguous");
  const selectedModelYear = selectedModelYears[0] ?? null;

  // derive state for all model years
  const allModelYears = [
    ...new Set(
      variants
        .filter(v => v.projectCode === selectedProject)
        .map(vehicle => vehicle.modelYear)
    )
  ].sort();

  // derive state for select variants
  const selectedVariants = [...new Set(value.map(vehicle => vehicle.variant))]
    .filter(v => v !== "")
    .sort();

  // derive state for all variants
  const allVariants = [
    ...new Set(
      variants
        .filter(
          v =>
            v.projectCode === selectedProject &&
            v.modelYear === selectedModelYear
        )
        .map(v => v.variant)
    )
  ].sort();

  // derive state for selected gates
  const selectedGates = [...new Set(value.map(vehicle => vehicle.gate))]
    .filter(v => v !== "")
    .sort();

  // create the selector components for project, model year, variant and gate with single select for project and model year and multi select for variant and gate
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
            onChange([
              {
                _id: "",
                gate: "",
                modelYear: "",
                projectCode: newValue,
                variant: ""
              }
            ]);
          }}
          value={selectedProject === "" ? null : selectedProject}
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
            onChange([
              {
                _id: "",
                gate: "",
                modelYear: newValue,
                projectCode: selectedProject,
                variant: ""
              }
            ]);
          }}
          value={selectedModelYear === "" ? null : selectedModelYear}
        />
      </Box>
      <Box flex="40%">
        <Autocomplete
          disableCloseOnSelect={true}
          disabled={selectedModelYear === ""}
          label="Vehicle Variant"
          required
          multiple={true}
          options={allVariants}
          onChange={(_event, value) => {
            const newVehicles = variants.filter(
              v =>
                v.projectCode === selectedProject &&
                v.modelYear === selectedModelYear &&
                value.includes(v.variant)
            );
            // if no vehicles keep the project and model year but clear the variant and gate in value
            if (newVehicles.length === 0) {
              onChange([
                {
                  _id: "",
                  gate: "",
                  modelYear: selectedModelYear,
                  projectCode: selectedProject,
                  variant: ""
                }
              ]);
              return;
            }
            // if no gates keep the project, model year and variant but clear the gate in value
            if (selectedGates.length === 0) {
              onChange(
                newVehicles.map(v => ({
                  _id: v._id,
                  gate: "",
                  modelYear: v.modelYear,
                  projectCode: v.projectCode,
                  variant: v.variant
                }))
              );
            }
            // if gates are selected update the value with the new vehicles and gates
            if (selectedGates.length > 0) {
              const newVehiclesWithGates = selectedGates.flatMap(gate =>
                newVehicles.map(v => ({
                  _id: v._id,
                  gate,
                  modelYear: v.modelYear,
                  projectCode: v.projectCode,
                  variant: v.variant
                }))
              );
              onChange(newVehiclesWithGates);
            }
          }}
          value={selectedVariants}
        />
      </Box>
      <Box flex="40%">
        <Autocomplete
          disableCloseOnSelect={true}
          disabled={selectedVariants.length === 0}
          required
          multiple={true}
          label="Gate"
          options={gates}
          onChange={(_event, value) => {
            const newVehicles = variants.filter(
              v =>
                v.projectCode === selectedProject &&
                v.modelYear === selectedModelYear &&
                selectedVariants.includes(v.variant)
            );
            // if no gates selected keep the project, model year and variant but clear the gate in value
            if (value.length === 0) {
              onChange(
                newVehicles.map(v => ({
                  _id: v._id,
                  gate: "",
                  modelYear: v.modelYear,
                  projectCode: v.projectCode,
                  variant: v.variant
                }))
              );
              return;
            }
            // if gates are selected update the value with the new vehicles and gates
            const newVehiclesWithGate = value.flatMap(gate =>
              newVehicles.map(v => ({
                _id: v._id,
                gate,
                modelYear: v.modelYear,
                projectCode: v.projectCode,
                variant: v.variant
              }))
            );
            onChange(newVehiclesWithGate);
          }}
          value={selectedGates}
        />
      </Box>
    </Box>
  );
}

export default VehicleSelect;
