import React, { useEffect, useState } from "react";
import {
  createVehicleRecord,
  filterVehicles,
  shouldAutoSelect
} from "./VehicleSelector.utils";

import Autocomplete from "../Autocomplete";
import { Box } from "@mui/material";
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
  // flags indicating whether the user has manually cleared a field.
  const [userClearedModelYear, setUserClearedModelYear] = useState(false);
  const [userClearedVariant, setUserClearedVariant] = useState(false);
  const [userClearedGate, setUserClearedGate] = useState(false);

  // derive state for selected project
  const selectedProjects = uniqueSortedArray(
    value.map(vehicle => vehicle.projectCode)
  );
  if (selectedProjects.length > 1) {
    throw new Error("Project selection is ambiguous");
  }
  const selectedProject = selectedProjects[0] ?? null;

  // derive state for all projects
  const allProjects = uniqueSortedArray(
    variants.map(vehicle => vehicle.projectCode)
  );

  // derive state for selected model year
  const selectedModelYears = uniqueSortedArray(
    value.map(vehicle => vehicle.modelYear)
  );

  if (selectedModelYears.length > 1) {
    throw new Error("Multiple year is ambiguous");
  }

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

  // reset flags when the project changes
  useEffect(() => {
    setUserClearedModelYear(false);
    setUserClearedVariant(false);
    setUserClearedGate(false);
  }, [selectedProject]);

  // reset the variant cleared flag whenever the selected model year changes
  useEffect(() => {
    setUserClearedVariant(false);
  }, [selectedModelYear]);

  // combined auto selection effect for model year and variant
  useEffect(() => {
    if (!selectedProject) return;

    // auto select model year when theres exactly one option and the field hasnt been cleared
    if (
      shouldAutoSelect({
        availableOptions: allModelYears,
        selectedValue: selectedModelYear,
        userCleared: userClearedModelYear
      })
    ) {
      onChange([
        createVehicleRecord({
          gate: "",
          modelYear: allModelYears[0],
          projectCode: selectedProject,
          variant: ""
        })
      ]);
    }

    // Auto-select Variant when there's exactly one option and the field hasn't been cleared.
    if (
      selectedModelYear &&
      selectedVariants.length === 0 &&
      allVariants.length === 1 &&
      !userClearedVariant
    ) {
      const autoVariant = allVariants[0];
      onChange(
        filterVehicles({
          modelYear: selectedModelYear,
          projectCode: selectedProject,
          variant: autoVariant,
          variants
        }).map(v => ({
          _id: v._id,
          gate: "",
          modelYear: v.modelYear,
          projectCode: v.projectCode,
          variant: v.variant
        }))
      );
    }
  }, [
    selectedProject,
    selectedModelYear,
    allModelYears,
    userClearedModelYear,
    selectedVariants,
    allVariants,
    userClearedVariant,
    variants,
    onChange
  ]);

  // auto selecting a gate if applicable.
  useEffect(() => {
    // Only auto-select if there are gate options available, one gate, one selected variant,
    // no gate is currently selected and the gate hasn't been manually cleared.
    if (
      gates &&
      gates.length === 1 &&
      selectedVariants.length > 0 &&
      selectedGates.length === 0 &&
      !userClearedGate
    ) {
      const autoGate = gates[0];

      // Filter the vehicles based on the current selections.
      const newVehicles = filterVehicles({
        modelYear: selectedModelYear,
        projectCode: selectedProject,
        variants
      }).filter(v => selectedVariants.includes(v.variant));

      // Update each vehicle record with the auto-selected gate.
      onChange(
        newVehicles.map(v => ({
          _id: v._id,
          gate: autoGate,
          modelYear: v.modelYear,
          projectCode: v.projectCode,
          variant: v.variant
        }))
      );
    }
  }, [
    gates,
    selectedVariants,
    selectedGates,
    selectedModelYear,
    selectedProject,
    variants,
    onChange,
    userClearedGate
  ]);

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
        sx={theme => ({
          "& .MuiFormLabel-asterisk": {
            color: disabled
              ? theme.palette.text.disabled
              : theme.palette.error.main
          },
          flex: "40%"
        })}
      >
        <Autocomplete
          label="Project Code"
          required
          multiple={false}
          options={allProjects}
          disabled={disabled}
          onChange={(_event, value) => {
            const newProject = value === null ? "" : value;
            // when the project changes clear lower fields
            onChange([
              createVehicleRecord({
                gate: "",
                modelYear: "",
                projectCode: newProject,
                variant: ""
              })
            ]);
          }}
          size={size}
          value={selectedProject === "" ? null : selectedProject}
        />
      </Box>
      <Box
        sx={theme => ({
          "& .MuiFormLabel-asterisk": {
            color:
              selectedProject === null || selectedProject === "" || disabled
                ? theme.palette.text.disabled
                : theme.palette.error.main
          },
          flex: "40%"
        })}
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
            const newModelYear = value === null ? "" : value;
            setUserClearedModelYear(newModelYear === "");
            // when model year changes clear variant and gate
            onChange([
              createVehicleRecord({
                gate: "",
                modelYear: newModelYear,
                projectCode: selectedProject,
                variant: ""
              })
            ]);
          }}
          size={size}
          value={selectedModelYear === "" ? null : selectedModelYear}
        />
      </Box>
      <Box
        flex="40%"
        sx={theme => ({
          "& .MuiFormLabel-asterisk": {
            color:
              selectedModelYear === null || selectedModelYear === "" || disabled
                ? theme.palette.text.disabled
                : theme.palette.error.main
          },
          flex: "40%"
        })}
      >
        <Autocomplete
          disableCloseOnSelect={multipleSelection}
          limitTags={limitTags}
          disabled={
            selectedModelYear === null || selectedModelYear === "" || disabled
          }
          label="Variant"
          multiple={multipleSelection}
          required
          options={allVariants}
          onChange={(_event, value) => {
            // initialize an empty array for the new variant(s) selected
            let newVariants: string[] = [];

            if (value) {
              // normalize the value into an array whether a single or multiple selection
              newVariants = Array.isArray(value) ? value : [value];
              // update the flag indicating if the variant field was cleared
              // If no variant is selected the length will be zero
              setUserClearedVariant(newVariants.length === 0);

              // filter available vehicles based on the current project and model year
              // then narrow down to those variants in the new selection.
              const newVehicles = filterVehicles({
                modelYear: selectedModelYear,
                projectCode: selectedProject,
                variants
              }).filter(v => newVariants.includes(v.variant));

              // if no vehicles match the selected variant(s)
              // clear the variant and gate fields but keep the project and model year.
              if (newVehicles.length === 0) {
                onChange([
                  createVehicleRecord({
                    modelYear: selectedModelYear,
                    projectCode: selectedProject,
                    variant: ""
                  })
                ]);
              }
              // if vehicles match and no gates are selected
              // update the value with the new vehicles while clearing the gate field
              else if (selectedGates.length === 0) {
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
              // if there are selected gates update the value with vehicles for each gate
              else {
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
              // if the field is cleared no value provided mark the variant as cleared
              // and reset the variant and gate fields while keeping the project and model year
              setUserClearedVariant(true);
              onChange([
                createVehicleRecord({
                  gate: "",
                  modelYear: selectedModelYear,
                  projectCode: selectedProject,
                  variant: ""
                })
              ]);
            }
          }}
          size={size}
          // if array is empty, set value to null to avoid rendering the clear button
          value={
            multipleSelection ? selectedVariants : selectedVariants[0] || null
          }
        />
      </Box>
      {gates.length > 0 && (
        <Box
          sx={theme => ({
            "& .MuiFormLabel-asterisk": {
              color:
                selectedVariants === null ||
                selectedVariants.length === 0 ||
                disabled
                  ? theme.palette.text.disabled
                  : theme.palette.error.main
            },
            flex: "40%"
          })}
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
              // Normalize and update userClearedGate flag accordingly.
              if (!value || (Array.isArray(value) && value.length === 0)) {
                setUserClearedGate(true);

                const newVehicles = filterVehicles({
                  modelYear: selectedModelYear,
                  projectCode: selectedProject,
                  variants
                }).filter(v => selectedVariants.includes(v.variant));

                // if no gates selected keep the project, model year and variant but clear the gate in value
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
              } else {
                setUserClearedGate(false);
              }

              const newVehicles = filterVehicles({
                modelYear: selectedModelYear,
                projectCode: selectedProject,
                variants
              }).filter(v => selectedVariants.includes(v.variant));

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
            value={multipleSelection ? selectedGates : selectedGates[0] || null}
          />
        </Box>
      )}
    </Box>
  );
}

export default VehicleSelector;
