import Autocomplete from "../Autocomplete";
import { Box } from "@mui/material";
import React from "react";
import { VehicleSelectorProps } from "./VehicleSelector.types";

// function to return unique sorted array of values from a string array
function uniqueSortedArray(values: string[]) {
  return values.filter((item, i, ar) => ar.indexOf(item) === i).sort();
}

// component to select a vehicle
function VehicleSelector({
  flexDirection = "column",
  flexWrap = "nowrap",
  gates = [],
  multipleSelection = false,
  onChange = () => {},
  value = [],
  variants = []
}: VehicleSelectorProps) {
  // derive state for selected project
  const selectedProjects = uniqueSortedArray(
    value.map(vehicle => vehicle.projectCode)
  );
  if (selectedProjects.length > 1)
    throw new Error("Project selection is ambiguous");
  const selectedProject = selectedProjects[0] ?? null;

  // derive state for all projects
  const allProjects = uniqueSortedArray(
    variants.map(vehicle => vehicle.projectCode)
  );

  // derive state for selected model year
  const selectedModelYears = uniqueSortedArray(
    value.map(vehicle => vehicle.modelYear)
  );
  if (selectedModelYears.length > 1)
    throw new Error("Multiple year is ambiguous");
  const selectedModelYear = selectedModelYears[0] ?? null;

  // derive state for all model years
  const allModelYears = uniqueSortedArray(
    variants
      .filter(v => v.projectCode === selectedProject)
      .map(vehicle => vehicle.modelYear)
  );

  // derive state for selected variants
  const selectedVariants = uniqueSortedArray(
    value.map(vehicle => vehicle.variant)
  ).filter(v => v !== "");

  // derive state for all variants
  const allVariants = uniqueSortedArray(
    variants
      .filter(
        v =>
          v.projectCode === selectedProject && v.modelYear === selectedModelYear
      )
      .map(vehicle => vehicle.variant)
  );

  // derive state for selected gates
  const selectedGates = uniqueSortedArray(
    value.map(vehicle => vehicle.gate)
  ).filter(v => v !== "");

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
          disabled={selectedProject === null || selectedProject === ""}
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
          disabled={selectedModelYear === null || selectedModelYear === ""}
          label="Vehicle Variant"
          required
          multiple={false}
          options={allVariants}
          onChange={(_event, value) => {
            if (value) {
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
            }
          }}
          value={selectedVariants[0]}
        />
      </Box>

      {gates.length > 0 && (
        <Box flex="40%">
          <Autocomplete
            disableCloseOnSelect={true}
            disabled={
              selectedVariants === null || selectedVariants.length === 0
            }
            required={gates.length > 0}
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
      )}
    </Box>
  );
}

export default VehicleSelector;
