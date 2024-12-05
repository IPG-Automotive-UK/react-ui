import Autocomplete from "../Autocomplete";
import { Box } from "@mui/material";
import React from "react";
import { VehicleSelectorProps } from "./VehicleSelector.types";
import { uniqueSortedArray } from "../utils/common";

// component to select a vehicle
function VehicleSelector({
  disabled = false,
  flexDirection = "column",
  limitTags = 1,
  flexWrap = "nowrap",
  gates = [],
  multipleSelection = false,
  onChange = () => {},
  size = "medium",
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
    value
      .filter(vehicle => vehicle.gate !== undefined)
      .map(vehicle => vehicle.gate!)
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
      <Box
        flex="40%"
        sx={{
          "& .MuiFormLabel-asterisk": {
            color: disabled ? "#9e9e9e" : "#d32f2f"
          }
        }}
      >
        <Autocomplete
          label="Project Code"
          required
          multiple={false}
          options={allProjects}
          disabled={disabled}
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
          size={size}
          value={selectedProject === "" ? null : selectedProject}
        />
      </Box>
      <Box
        flex="40%"
        sx={{
          "& .MuiFormLabel-asterisk": {
            color:
              selectedProject === null || selectedProject === "" || disabled
                ? "#9e9e9e"
                : "#d32f2f"
          }
        }}
      >
        <Autocomplete
          disabled={
            selectedProject === null || selectedProject === "" || disabled
          }
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
                modelYear: newValue || "",
                projectCode: selectedProject,
                variant: ""
              }
            ]);
          }}
          size={size}
          value={selectedModelYear === "" ? null : selectedModelYear}
        />
      </Box>
      <Box
        flex="40%"
        sx={{
          "& .MuiFormLabel-asterisk": {
            color:
              selectedModelYear === null || selectedModelYear === "" || disabled
                ? "#9e9e9e"
                : "#d32f2f"
          }
        }}
      >
        <Autocomplete
          disableCloseOnSelect={multipleSelection}
          limitTags={limitTags}
          disabled={
            selectedModelYear === null || selectedModelYear === "" || disabled
          }
          label="Vehicle Variant"
          multiple={multipleSelection}
          required
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
            } else {
              onChange([
                {
                  _id: "",
                  gate: "",
                  modelYear: selectedModelYear,
                  projectCode: selectedProject,
                  variant: ""
                }
              ]);
            }
          }}
          size={size}
          value={selectedVariants}
        />
      </Box>
      {gates.length > 0 && (
        <Box
          flex="40%"
          sx={{
            "& .MuiFormLabel-asterisk": {
              color:
                selectedVariants === null ||
                selectedVariants.length === 0 ||
                disabled
                  ? "#9e9e9e"
                  : "#d32f2f"
            }
          }}
        >
          <Autocomplete
            disableCloseOnSelect={multipleSelection}
            disabled={
              selectedVariants === null ||
              selectedVariants.length === 0 ||
              disabled
            }
            required={gates.length > 0}
            multiple={multipleSelection}
            label="Gate"
            limitTags={limitTags}
            options={gates}
            onChange={(_event, value) => {
              const newVehicles = variants.filter(
                v =>
                  v.projectCode === selectedProject &&
                  v.modelYear === selectedModelYear &&
                  selectedVariants.includes(v.variant)
              );
              // if no gates selected keep the project, model year and variant but clear the gate in value
              if (!value || value.length === 0) {
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

              // if multiple selection is enabled, update the value with the new vehicles and gates
              if (multipleSelection && Array.isArray(value)) {
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
              } else {
                // if multiple selection is disabled, update the value with the new vehicles and gate
                onChange(
                  newVehicles.map(v => ({
                    _id: v._id,
                    gate: value as string,
                    modelYear: v.modelYear,
                    projectCode: v.projectCode,
                    variant: v.variant
                  }))
                );
              }
            }}
            size={size}
            value={selectedGates}
          />
        </Box>
      )}
    </Box>
  );
}

export default VehicleSelector;
