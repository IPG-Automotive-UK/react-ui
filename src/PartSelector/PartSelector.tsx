import Autocomplete from "../Autocomplete";
import { Box } from "@mui/material";
import { PartSelectorProps } from "./PartSelector.types";
import React from "react";
import { uniqueSortedArray } from "../utils/common";

// component to select a part
function PartSelector({
  flexDirection = "column",
  flexWrap = "nowrap",
  onChange = () => {},
  size = "medium",
  value = { _id: "", part_name: "", part_number: "" },
  parts = [],
  sortOrder = "asc"
}: PartSelectorProps) {
  // sort and get unique part names
  const partNames = uniqueSortedArray(
    parts.map(part => part.part_name),
    sortOrder
  );

  // get part numbers for the selected part name
  const partNumbers = uniqueSortedArray(
    parts
      .filter(part => part.part_name === value.part_name)
      .map(part => part.part_number)
      .filter(number => number !== ""),
    sortOrder
  );

  // create the selector components for part name and part number
  return (
    <Box
      data-testid="part-select"
      sx={{
        display: "flex",
        flexDirection,
        flexWrap,
        gap: flexDirection === "row" ? "0 24px" : 0
      }}
    >
      <Box flex="40%">
        <Autocomplete
          label="Part Name"
          required
          multiple={false}
          options={partNames}
          onChange={(_event, partName) => {
            const newValue = partName === null ? "" : partName;
            // update onChange with the new part name
            onChange({
              _id: "",
              part_name: newValue,
              part_number: ""
            });
          }}
          size={size}
          value={value.part_name === "" ? null : value.part_name}
        />
      </Box>
      <Box flex="40%">
        <Autocomplete
          disabled={value.part_name === null || value.part_name === ""}
          label="Part Number"
          required
          multiple={false}
          options={partNumbers}
          onChange={(_event, partNumber) => {
            if (partNumber === null) {
              // Clear the field and send a callback
              onChange({
                _id: "",
                part_name: value.part_name,
                part_number: ""
              });
            } else {
              const newValue = partNumber;

              // get the part id for the selected part number
              const partId = parts.filter(
                part =>
                  part.part_number === newValue &&
                  part.part_name === value.part_name
              )[0]._id;

              // update onChange with the new part number and part id
              onChange({
                _id: partId,
                part_name: value.part_name,
                part_number: newValue
              });
            }
          }}
          size={size}
          value={value.part_number === "" ? null : value.part_number}
        />
      </Box>
    </Box>
  );
}

export default PartSelector;
