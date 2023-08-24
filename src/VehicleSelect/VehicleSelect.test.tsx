import React from "react";
import VehicleSelect from "./VehicleSelect";
import { VehicleSelectProps } from "./VehicleSelect.types";
import { render } from "@testing-library/react";

const defaultProps = {
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
  onVehicleChange: () => {},
  selectedVehicles: []
};

/**
 * Test wrapper for VehicleSelect
 *
 * Provides state for value to avoid errors changing from uncontrolled to controlled.
 */

const VehicleSelectWithState = ({
  onVehicleChange,
  selectedVehicles: valueIn = [],
  ...rest
}: VehicleSelectProps) => {
  const [value, setValue] = React.useState(valueIn);
  const handleChange = selectedValues => {
    setValue(selectedValues);
    onVehicleChange(selectedValues);
  };

  return (
    <VehicleSelect
      {...rest}
      onVehicleChange={handleChange}
      selectedVehicles={value}
    />
  );
};

/**
 * Tests
 */
describe("Vehicle Select", () => {
  it("renders component", () => {
    render(<VehicleSelectWithState {...defaultProps} />);
  });
});
